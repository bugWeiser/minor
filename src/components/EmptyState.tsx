'use client';

export default function EmptyState({ message = 'No notices found', sub }: { message?: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-4">📭</div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">{message}</h3>
      {sub && <p className="text-sm text-gray-400">{sub}</p>}
    </div>
  );
}
