import { create } from 'zustand';
import toast from 'react-hot-toast';
import { generateMicrocopyWithGemini } from '@/lib/microgenerator';
import { saveGeneratedMicrocopy, deleteSavedMicrocopy } from '@/lib/saveMicrocopy';
import { v4 as uuidv4 } from 'uuid';
import { createClerkSupabaseClient } from '@/lib/supabaseClient';

const useGenerateStore = create((set, get) => ({
  generatedMicrocopy: null,
  isLoading: false,
  errorMessage: '',
  isSaving: false,
  isDeleting: false,

  handleSubmit: async (data, session) => {
    if (!data.purpose || !data.context || !data.tone) {
      toast.error('All fields are mandatory.');
      return;
    }
    set({ isLoading: true, errorMessage: '' });
    try {
      const generated = await generateMicrocopyWithGemini(data.purpose, data.context, data.tone);
      set({ generatedMicrocopy: { purpose: data.purpose, texts: generated, context: data.context, tone: data.tone } });
    } catch (error) {
      toast.error('Failed to generate microcopy. Please try again.');
      set({ errorMessage: 'Failed to generate microcopy. Please try again.' });
    } finally {
      set({ isLoading: false });
    }
  },

  handleRegenerate: async () => {
    const { generatedMicrocopy } = get();
    if (generatedMicrocopy) {
      set({ isLoading: true, errorMessage: '' });
      try {
        const newTexts = await generateMicrocopyWithGemini(generatedMicrocopy.purpose, generatedMicrocopy.context, generatedMicrocopy.tone);
        set({ generatedMicrocopy: { ...generatedMicrocopy, texts: newTexts } });
      } catch (error) {
        toast.error('Failed to regenerate microcopy. Please try again.');
        set({ errorMessage: 'Failed to regenerate microcopy. Please try again.' });
      } finally {
        set({ isLoading: false });
      }
    }
  },

  handleSave: async (text, session) => {
    set({ isSaving: true, errorMessage: '' });
    const { generatedMicrocopy } = get();
    const data = {
      user_id: session.user.id,
      category: generatedMicrocopy.purpose,
      context: generatedMicrocopy.context,
      tone: generatedMicrocopy.tone,
      content: text,
      item_id: uuidv4(),
    };

    const savePromise = saveGeneratedMicrocopy(session, data);

    toast.promise(
      savePromise,
      {
        loading: 'Saving...',
        success: 'Microcopy saved successfully!',
        error: 'Error saving microcopy. Please try again.',
      }
    );

    try {
      await savePromise;
      set({ isSaving: false });
    } catch (error) {
      console.error('Error saving microcopy:', error);
      set({ isSaving: false });
    }
  },

  handleDelete: async (text, session) => {
    set({ isDeleting: true, errorMessage: '' });
    
    try {
      const supabase = createClerkSupabaseClient(session);
      
      // First, query the database to get the item_id for this text
      const { data, error } = await supabase
        .from('phrase_user_profile_data')
        .select('item_id')
        .match({
          user_id: session.user.id,
          content: text
        })
        .single();
  
      if (error) {
        console.error('Error finding item:', error);
        throw new Error('Could not find the item to delete');
      }
  
      if (!data) {
        throw new Error('Item not found');
      }
  
      // Now delete the item
      const { error: deleteError } = await supabase
        .from('phrase_user_profile_data')
        .delete()
        .match({
          user_id: session.user.id,
          item_id: data.item_id
        });
  
      if (deleteError) {
        console.error('Error deleting:', deleteError);
        throw new Error('Failed to delete item');
      }
  
      toast.success('Microcopy deleted successfully!');
      
      // Update the UI
      const { generatedMicrocopy } = get();
      if (generatedMicrocopy) {
        const updatedTexts = generatedMicrocopy.texts.filter(t => t !== text);
        set({
          generatedMicrocopy: {
            ...generatedMicrocopy,
            texts: updatedTexts
          }
        });
      }
    } catch (error) {
      console.error('Error deleting microcopy:', error);
      toast.error('Error deleting microcopy. Please try again.');
    } finally {
      set({ isDeleting: false });
    }
  }

}));

export default useGenerateStore;
