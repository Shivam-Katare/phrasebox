'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CopyIcon, TrashIcon, FilterIcon, SearchIcon, Loader2Icon } from 'lucide-react';
import { EmptyState } from '@/components/empty-state';
import useTemplateStore from '@/store/templates';
import { useSession } from '@clerk/nextjs';

export default function SavedMicrocopies() {
  const { session } = useSession();
  const { savedMicrocopies, fetchSavedMicrocopies, deleteSavedMicrocopy, isLoading } = useTemplateStore();
  const [filteredMicrocopies, setFilteredMicrocopies] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [toneFilter, setToneFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    session && fetchSavedMicrocopies(session);
  }, [session, fetchSavedMicrocopies]);

  useEffect(() => {
    let filtered = savedMicrocopies;

    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered.filter(m => m.category === categoryFilter);
    }

    if (toneFilter && toneFilter !== 'all') {
      filtered = filtered.filter(m => m.tone === toneFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(m =>
        m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.context.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMicrocopies(filtered);
  }, [savedMicrocopies, categoryFilter, toneFilter, searchQuery]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const removeMicrocopy = async (itemId) => {
    const success = await deleteSavedMicrocopy(session, itemId);
    if (success) {
      // No need to update local state, as it is managed globally in the store
    }
  };

  const categories = Array.from(new Set(savedMicrocopies.map(m => m.category)));
  const tones = Array.from(new Set(savedMicrocopies.map(m => m.tone)));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Saved Microcopies</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex items-center gap-2 flex-grow">
          <FilterIcon className="w-5 h-5 text-gray-400" />
          <Select onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 flex-grow">
          <FilterIcon className="w-5 h-5 text-gray-400" />
          <Select onValueChange={setToneFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by Tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tones</SelectItem>
              {tones.map(tone => (
                <SelectItem key={tone} value={tone}>{tone}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 flex-grow">
          <SearchIcon className="w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search microcopies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2Icon className="w-8 h-8 animate-spin" />
        </div>
      ) : filteredMicrocopies.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredMicrocopies.map((microcopy) => (
            <motion.div
              key={microcopy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{microcopy.category}</h3>
                  <p className="text-sm text-gray-500 mb-2">Tone: {microcopy.tone}</p>
                  <p className="mb-4">{microcopy.content}</p>
                  <p className="text-sm text-gray-600 mb-4">Context: {microcopy.context}</p>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(microcopy.content)}>
                      <CopyIcon className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => removeMicrocopy(microcopy.item_id)}>
                      <TrashIcon className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

