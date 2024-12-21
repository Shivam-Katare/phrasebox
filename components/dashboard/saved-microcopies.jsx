import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CopyIcon } from 'lucide-react';
import useDashboardStore from '@/store/dashboard';
import { useSession } from '@clerk/nextjs';
import { capitalizeFirstLetter } from '@/lib/utils';

export function SavedMicrocopies({ onCopy }) {
  const { latestMicrocopies, fetchLatestMicrocopies } = useDashboardStore();
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      fetchLatestMicrocopies(session);
    }
  }, [session, fetchLatestMicrocopies]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Microcopies</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {latestMicrocopies?.map((microcopy) => (
            <div key={microcopy?.id} className="mb-4 p-2 bg-secondary rounded-md">
              <div className="text-sm font-semibold mb-1">{capitalizeFirstLetter(microcopy?.category)}</div>
              <p className="text-sm mb-2">{capitalizeFirstLetter(microcopy?.content)}</p>
              <Button variant="outline" size="sm" onClick={onCopy}>
                <CopyIcon className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

