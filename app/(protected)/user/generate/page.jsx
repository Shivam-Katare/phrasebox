'use client'

import { React, useState } from 'react';
import { InputForm } from '@/components/input-form';
import { MicrocopyDisplay } from '@/components/dashboard/microcopy-display';
import { useSession } from '@clerk/nextjs';
import useGenerateStore from '@/store/generates';
import { Toaster } from 'react-hot-toast';

export default function Generates() {
  const { session } = useSession();
  const {
    generatedMicrocopy,
    isLoading,
    errorMessage,
    handleSubmit,
    handleRegenerate,
    handleSave,
    handleDelete,
    isSaving,
    isDeleting,
  } = useGenerateStore();

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormChange = (isValid) => {
    setIsFormValid(isValid);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Generate Perfect Microcopy
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Create compelling microcopy tailored to your needs
          </p>
        </div>

        <div className="grid lg:grid-cols-[400px,1fr] gap-8">
          {/* Input Form Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-fit">
            <InputForm
              onSubmit={(data) => handleSubmit(data, session)}
              isLoading={isLoading}
              onFormChange={handleFormChange}
            />
          </div>

          {/* Generated Content Section */}
          <div className="space-y-6">
            {generatedMicrocopy ? (
              <MicrocopyDisplay
                purpose={generatedMicrocopy.purpose}
                texts={generatedMicrocopy.texts}
                onFavorite={() => console.log('Added to favorites')}
                onRegenerate={handleRegenerate}
                errorMessage={errorMessage}
                onSave={(text) => handleSave(text, session)}
                onDelete={(text) => handleDelete(text, session)}
                isSaving={isSaving}
                isDeleting={isDeleting}
              />
            ) : (
              <div className="text-center text-gray-600 dark:text-gray-400 flex items-center justify-center h-96">
                Selects the fields and generate microcopy
              </div>
            )
          }
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
