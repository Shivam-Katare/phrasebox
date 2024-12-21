import { create } from 'zustand';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { createClerkSupabaseClient } from '@/lib/supabaseClient';

const useDashboardStore = create((set, get) => ({
  isLoading: false,
  totalCopies: 0,
  errorMessage: '',
  topTemplates: [],
  incrementTotalCopies: async (session) => {
    const supabase = createClerkSupabaseClient(session);
    const { totalCopies } = get();
    const newTotalCopies = totalCopies + 1;
    const { data, error } = await supabase
      .from('phrase_box_detail')
      .update({ total_copies: newTotalCopies })
      .eq('id', 1);
    if (error) {
      console.error('Failed to update total copies:', error);
    } else {
      set({ totalCopies: newTotalCopies });
    }
  },
  updateTotalCopies: async (session) => {
    const supabase = createClerkSupabaseClient(session);
    const { totalCopies } = get();
    const { data, error } = await supabase
      .from('phrase_box_detail')
      .update({ total_copies: totalCopies })
      .eq('id', 1);
    if (error) {
      console.error('Failed to update total copies:', error);
      set((state) => ({ totalCopies: state.totalCopies - 1 }));
    }
  },
  fetchTotalCopies: async (session) => {
    const supabase = createClerkSupabaseClient(session);
    const { data, error } = await supabase
      .from('phrase_box_detail')
      .select('total_copies')
      .eq('id', 1);
    if (error) {
      console.error('Failed to fetch total copies:', error);
    } else {
      set({ totalCopies: data[0]?.total_copies || 0 });
    }
  },
  fetchUserData: async (session) => {
    const supabase = createClerkSupabaseClient(session);
    const userId = session.user.id;
    const { data, error } = await supabase
      .from('phrase_user_profile_data')
      .select('total_saved, total_copies, recent_activity, saved_microcopies')
      .eq('user_id', userId);
    if (error) {
      console.error('Failed to fetch user data:', error);
    } else {
      set({
        totalSaved: data[0]?.total_saved || 0,
        totalCopies: data[0]?.total_copies || 0,
        recentActivity: data[0]?.recent_activity || [],
        savedMicrocopies: data[0]?.saved_microcopies || [],
      });
    }
  },
  fetchLatestMicrocopies: async (session) => {
    const supabase = createClerkSupabaseClient(session);
    const userId = session.user.id;
    const { data, error } = await supabase
      .from('phrase_user_profile_data')
      .select('id, created_at, category, tone, context, content')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(3);
    if (error) {
      console.error('Failed to fetch latest microcopies:', error);
    } else {
      set({ latestMicrocopies: data });
    }
  },
  fetchTotalSaved: async (session) => {
    const supabase = createClerkSupabaseClient(session);
    const userId = session.user.id;
    const { data, error } = await supabase
      .from('phrase_user_profile_data')
      .select('id', { count: 'exact' })
      .eq('user_id', userId);
    if (error) {
      console.error('Failed to fetch total saved microcopies:', error);
    } else {
      set({ totalSaved: data.length });
    }
  },
}))

export default useDashboardStore;