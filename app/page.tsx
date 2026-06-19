import dynamic from "next/dynamic"
import { Suspense } from "react"

// Create a loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <div className="h-8 bg-gray-200 rounded-md w-1/3 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-md animate-pulse"></div>
        ))}
      </div>
      <div className="h-60 bg-gray-200 rounded-md animate-pulse mt-4"></div>
    </div>
  )
}

// Dynamically import the DashboardPage component with SSR disabled
// Fix the import path to match the actual file location
const DashboardPage = dynamic(() => import("../components/dashboard-page").then((mod) => mod.DashboardPage), {
  //ssr: false,
  loading: () => <LoadingSkeleton />,
})

export default function Home() {
  return (
    <>
      <title>TeachFlow</title>
      <Suspense fallback={<LoadingSkeleton />}>
        <DashboardPage />
      </Suspense>
    </>
  )
}
