import { createClerkSupabaseClient } from '@/lib/supabaseClient';

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
      throw new Error('Error saving microcopy:', error);
    }
  } catch (err) {
    console.error('Error saving microcopy:', err);
    throw err;
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
      console.error('Error deleting microcopy:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting microcopy:', error);
    return false;
  }
}
