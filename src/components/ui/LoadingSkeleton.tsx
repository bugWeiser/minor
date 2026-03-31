'use client';

// NoticeCard skeleton — editorial look
export function NoticeCardSkeleton() {
  return (
    <div className="card-shell p-6 space-y-4 animate-pulse bg-white border-border-subtle">
      <div className="flex items-center gap-3">
        <div className="h-6 w-20 bg-bg-card-secondary rounded-lg" />
        <div className="h-6 w-16 bg-bg-card-secondary rounded-lg" />
      </div>
      <div className="h-8 w-3/4 bg-bg-card-secondary rounded-xl" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-bg-hover rounded-lg" />
        <div className="h-4 w-5/6 bg-bg-hover rounded-lg" />
      </div>
      <div className="pt-4 border-t border-dashed border-border-subtle flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="h-8 w-8 rounded-full bg-bg-card-secondary" />
           <div className="h-4 w-24 bg-bg-hover rounded-lg" />
        </div>
        <div className="h-4 w-20 bg-bg-hover rounded-lg" />
      </div>
    </div>
  );
}

// Widget skeleton (card container)
export function WidgetSkeleton() {
  return (
    <div className="card-shell p-6 animate-pulse bg-white border-border-subtle">
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 w-32 bg-bg-card-secondary rounded-xl" />
        <div className="h-6 w-16 bg-bg-card-secondary rounded-xl" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 bg-bg-hover rounded-2xl border border-border-subtle" />
        ))}
      </div>
    </div>
  );
}

// List item skeleton (single row)
export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 card-shell border-border-subtle bg-white opacity-40 animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-bg-card-secondary shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 bg-bg-card-secondary rounded-lg" />
        <div className="h-3 w-1/3 bg-bg-hover rounded-lg" />
      </div>
      <div className="h-8 w-16 bg-bg-hover rounded-xl" />
    </div>
  );
}

// Calendar skeleton
export function CalendarSkeleton() {
  return (
    <div className="card-shell p-6 animate-pulse bg-white border-border-subtle space-y-6">
      <header className="flex justify-between items-center pb-4 border-b border-border-subtle border-dashed">
         <div className="h-6 w-32 bg-bg-card-secondary rounded-xl" />
         <div className="h-6 w-24 bg-bg-card-secondary rounded-xl" />
      </header>
      
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-4 bg-bg-card-secondary rounded" />
          ))}
        </div>
        
        {Array.from({ length: 5 }).map((_, row) => (
          <div key={row} className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, col) => (
              <div key={col} className="h-12 bg-bg-hover rounded-xl" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Notice list — multiple cards
export function NoticeListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <NoticeCardSkeleton key={i} />
      ))}
    </div>
  );
}
