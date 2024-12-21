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
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <div className="min-h-screen flex-1 rounded-xl bg-muted/50 py-8">
        <h1 className="px-5 mb-8">Generate a best microcopy according to you!</h1>
        <div className="max-w-2xl mx-auto">
          <InputForm onSubmit={(data) => handleSubmit(data, session)} isLoading={isLoading} onFormChange={handleFormChange} />
          {generatedMicrocopy && (
            <div className="mt-8">
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
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
