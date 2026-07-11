// @ts-nocheck
// @ts-nocheck
export function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="h-8 w-64 bg-gray-200 rounded-md animate-pulse dark:bg-gray-700"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"></div>
          ))}
      </div>
    </div>
  )
}
