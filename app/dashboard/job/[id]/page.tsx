import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { getJobAction } from '../actions';
import { notFound } from 'next/navigation';
import JobDetail from '../_components/job-detail';

type Params = Promise<{ id: number }>;
export default async function JobDetailPage({ params }: { params: Params }) {
  const { id } = await params;

  const queryClient = new QueryClient();
  const job = await queryClient.fetchQuery({
    queryKey: ['job', id],
    queryFn: () => getJobAction({ jobId: id }),
  });

  if (!job) {
    return notFound();
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <JobDetail jobId={id} />
      </HydrationBoundary>
    </>
  );
}
