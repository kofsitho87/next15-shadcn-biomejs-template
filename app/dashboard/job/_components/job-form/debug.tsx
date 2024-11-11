import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';

export default function DebugComponent() {
  const form = useFormContext();
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Job Data</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[94vh] max-w-5xl overflow-auto">
          <DialogHeader>
            <DialogTitle>Job Data</DialogTitle>
          </DialogHeader>
          <div className="my-4 whitespace-pre-wrap break-all">{JSON.stringify(form.getValues(), null, 4)}</div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Error Data</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[94vh] max-w-5xl overflow-auto">
          <DialogHeader>
            <DialogTitle>Error Data</DialogTitle>
          </DialogHeader>
          <div className="my-4 whitespace-pre-wrap break-all">{JSON.stringify(form.formState.errors, null, 4)}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
