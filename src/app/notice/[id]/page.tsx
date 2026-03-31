'use client';

import { useParams, useRouter, redirect } from 'next/navigation';
import { useEffect } from 'react';

// Safety-net redirect: old /notice/[id] → /notices/[id]
export default function OldNoticeRedirect() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  useEffect(() => {
    router.replace(`/notices/${id}`);
  }, [id, router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="animate-spin w-8 h-8 rounded-full border-4 border-indigo-500 border-t-transparent" />
    </div>
  );
}
