import { create } from 'zustand';
import { createClerkSupabaseClient } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';
import { createSupabaseHelpers } from '@/lib/supabaseHelpers';

const useTemplateStore = create((set, get) => {
  const updateSavedTemplates = (itemId, action) => {
    set((state) => ({
      savedTemplates: action === 'deleted'
        ? state.savedTemplates.filter(id => id !== itemId)
        : [...state.savedTemplates, itemId]
    }));
  };

  return {
    userId: null,
    username: null,
    profilData: null,
    buttonMicroCopy: [],
    alertMicroCopy: [],
    errorpageMicroCopy: [],
    savedTemplates: [],
    savedMicrocopies: [],
    isLoading: false,
    isSaving: false,
    isButtonDisabled: false,

    fetchMicroCopy: async (session, type) => {
      if (!session) return;

      const supabase = createClerkSupabaseClient(session);
      const helpers = createSupabaseHelpers(supabase);
      set({ isLoading: true });

      try {
        // Fetch microcopy data
        const tableName = `${type}_micro_copy`;
        const microCopyData = await helpers.fetchData(tableName);

        // Fetch saved templates
        const savedData = await helpers.fetchData('phrase_user_profile_data', session.user.id, {
          select: 'item_id'
        });

        const savedTemplates = savedData.map(item => item.item_id);

        set({ 
          [`${type}MicroCopy`]: microCopyData, 
          savedTemplates 
        });

        return microCopyData;
      } catch (error) {
        toast.error(`Error fetching ${type} microcopy`);
        set({ [`${type}MicroCopy`]: [] });
        return null;
      } finally {
        set({ isLoading: false });
      }

    },

    saveMicroCopy: async (session, item, type) => {
      if (!session) return;

      const supabase = createClerkSupabaseClient(session);
      const helpers = createSupabaseHelpers(supabase);
      set({ isSaving: true, isButtonDisabled: true });

      const savePromise = (async () => {
        try {
          const result = await helpers.toggleSaveItem(session.user.id, item);
          updateSavedTemplates(item.id, result.action);
          return true;
        } catch (error) {
          toast.error(`Error saving ${type} microcopy`);
          return false;
        } finally {
          set({ isSaving: false, isButtonDisabled: false });
        }
      })();

      toast.promise(savePromise, {
        loading: 'Saving...',
        success: `${type} microcopy updated successfully!`,
        error: 'There was a problem updating. Please retry.',
      });

      return savePromise;
    },

    fetchSavedMicrocopies: async (session) => {
      if (!session) return;

      const supabase = createClerkSupabaseClient(session);
      const helpers = createSupabaseHelpers(supabase);
      set({ isLoading: true });

      try {
        const data = await helpers.fetchData('phrase_user_profile_data', session.user.id);
        set({ savedMicrocopies: data });
        return data;
      } catch (error) {
        set({ savedMicrocopies: [] });
        return null;
      } finally {
        set({ isLoading: false });
      }
    },
  fetchSavedMicrocopies: async (session) => {
    if (!session) {
      return;
    }

    const supabase = createClerkSupabaseClient(session);
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('phrase_user_profile_data')
        .select('*')
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error fetching saved microcopies:', error);
        return null;
      }

      set({ savedMicrocopies: data });
      return data;
    } catch (err) {
      set({ savedMicrocopies: [] });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSavedMicrocopy: async (session, itemId) => {
    if (!session) {
      return;
    }

    const supabase = createClerkSupabaseClient(session);
    set({ isSaving: true });
    try {
      const { error } = await supabase
        .from('phrase_user_profile_data')
        .delete()
        .eq('user_id', session.user.id)
        .eq('item_id', itemId);

      if (error) {
        toast.error('Error deleting saved microcopy. Please try again.');
        return null;
      }

      set((state) => ({
        savedMicrocopies: state.savedMicrocopies.filter((item) => item.item_id !== itemId),
      }));

      toast.success('Microcopy deleted successfully');
      return true;
    } catch (err) {
      toast.error('Error deleting microcopy. Please try again.');
      return null;
    } finally {
      set({ isSaving: false });
    }
  },
  };
});

export default useTemplateStore;