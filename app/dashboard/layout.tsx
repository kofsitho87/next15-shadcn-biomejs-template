import AppSidebar from '@/components/layout/app-sidebar';
import { getSession } from '@/lib/session';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <>
      <AppSidebar session={session}>{children}</AppSidebar>
    </>
    // <>{children}</>
  );
}
1;
