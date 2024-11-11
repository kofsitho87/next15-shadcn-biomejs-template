import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import JobForm from '../../_components/job-form/index';
import { getJobAction } from '../../actions';
import { notFound } from 'next/navigation';

type Params = Promise<{ id: number }>;
export default async function JobEditPage({ params }: { params: Params }) {
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
        <JobForm jobId={id} />
      </HydrationBoundary>
    </>
  );
}
