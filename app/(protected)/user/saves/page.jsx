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
import { capitalizeFirstLetter } from '@/lib/utils';
import { Toaster } from 'react-hot-toast';
import useDashboardStore from '@/store/dashboard';

export default function SavedMicrocopies() {
  const { session } = useSession();
  const { savedMicrocopies, fetchSavedMicrocopies, deleteSavedMicrocopy, isLoading } = useTemplateStore();
  const { incrementTotalCopies } = useDashboardStore();
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
    if(session) {
      incrementTotalCopies(session);
    }
  };

  const removeMicrocopy = async (itemId) => {
    deleteSavedMicrocopy(session, itemId);
  };

  const categories = Array.from(new Set(savedMicrocopies.map(m => m.category)));
  const tones = Array.from(new Set(savedMicrocopies.map(m => m.tone)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Saved Collection
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and organize your favorite microcopies
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FilterIcon className="w-4 h-4 text-purple-500" />
                Category
              </label>
              <Select onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full border-gray-200 hover:border-purple-500 transition-colors">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {capitalizeFirstLetter(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tone Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FilterIcon className="w-4 h-4 text-blue-500" />
                Tone
              </label>
              <Select onValueChange={setToneFilter}>
                <SelectTrigger className="w-full border-gray-200 hover:border-blue-500 transition-colors">
                  <SelectValue placeholder="Filter by Tone" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Tones</SelectItem>
                  {tones.map(tone => (
                    <SelectItem key={tone} value={tone}>
                      {capitalizeFirstLetter(tone)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <SearchIcon className="w-4 h-4 text-gray-500" />
                Search
              </label>
              <Input
                type="text"
                placeholder="Search microcopies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-gray-200 focus:border-gray-300 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2Icon className="w-8 h-8 animate-spin text-purple-500" />
            <p className="text-gray-600">Loading your collection...</p>
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
                <Card className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-transparent hover:border-purple-100">
                  <CardContent className="p-6">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                        {microcopy.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                        {microcopy.tone}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mb-4 space-y-3">
                      <p className="text-gray-800 font-medium leading-relaxed">
                        {microcopy.content}
                      </p>
                      <p className="text-sm text-gray-600">
                        Context: {microcopy.context}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between pt-4 border-t border-gray-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(microcopy.content)}
                        className="hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        <CopyIcon className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMicrocopy(microcopy.item_id)}
                        className="hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
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
      <Toaster />
    </div>
  );
}

