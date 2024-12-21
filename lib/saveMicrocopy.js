import { createClerkSupabaseClient } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';

export async function saveGeneratedMicrocopy(session, data) {
  if (!session) {
    throw new Error('No session available');
  }

  const supabase = createClerkSupabaseClient(session);

  try {
    const { error } = await supabase
      .from('phrase_user_profile_data')
      .insert(data);

    if (error) {
      toast.error('Error saving microcopy. Please try again.');
    }
  } catch (err) {
    toast.error('Error saving microcopy. Please try again.');
  }
}

export async function deleteSavedMicrocopy(session, itemId) {
  if (!session) {
    throw new Error('No session available');
  }

  const supabase = createClerkSupabaseClient(session);

  try {
    const { error } = await supabase
      .from('phrase_user_profile_data')
      .delete()
      .match({
        user_id: session.user.id,
        item_id: itemId
      });

    if (error) {
      toast.error('Error deleting microcopy. Please try again.');
      return false;
    }

    return true;
  } catch (error) {
    toast.error('Error deleting microcopy. Please try again.');
    return false;
  }
}
