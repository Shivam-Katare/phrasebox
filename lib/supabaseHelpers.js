export const createSupabaseHelpers = (supabase) => ({
  async fetchData(tableName, userId = null, options = {}) {
    const query = supabase
      .from(tableName)
      .select(options.select || '*', { count: options.count })
      .order(options.orderBy || 'id', { ascending: options.ascending ?? false });

    if (userId) {
      query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
  async toggleSaveItem(userId, item, options = {}) {
    const {
      tableName = 'phrase_user_profile_data',
      idField = 'item_id'
    } = options;

    // Check if item exists
    const { data: existingData } = await supabase
      .from(tableName)
      .select('id')
      .eq('user_id', userId)
      .eq(idField, item.id)
      .single();

    if (existingData) {
      // Delete existing item
      const { error: deleteError } = await supabase
        .from(tableName)
        .delete()
        .eq('id', existingData.id);
      if (deleteError) throw deleteError;
      return { action: 'deleted', itemId: item.id };
    } else {
      // Insert new item
      const { error: insertError } = await supabase
        .from(tableName)
        .insert({
          user_id: userId,
          [idField]: item.id,
          category: item.category || item.type,
          context: item.context,
          tone: item.tone,
          content: item.content,
        });

      if (insertError) throw insertError;
      return { action: 'inserted', itemId: item.id };
    }
  }
});