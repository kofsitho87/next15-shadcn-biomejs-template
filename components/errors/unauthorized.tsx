import Link from 'next/link';

export default function Unauthorized() {
  return (
    <main className="grid h-full min-h-full place-items-center bg-white px-6 py-24 sm:py-72 lg:px-8">
      <div className="text-center">
        <p className="font-semibold text-base text-blue-600">Unauthorized</p>
        <h1 className="mt-4 font-bold text-3xl text-gray-900 tracking-tight sm:text-5xl">페이지 접근 권한이 없습니다.</h1>
        <p className="mt-6 text-base text-gray-600 leading-7">죄송합니다. 이 페이지에 접근할 권한이 없습니다.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/dashboard"
            className="rounded-md bg-blue-500 px-3.5 py-2.5 font-semibold text-sm text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
          >
            홈으로 이동
          </Link>
        </div>
      </div>
    </main>
  );
}
