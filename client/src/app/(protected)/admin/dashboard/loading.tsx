import Skeleton from "@/components/ui/Skeleton";

const Loading = () => {
  return (
     <main>
      <Skeleton className="h-8 w-45" />
      <div className="mt-8 mb-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Skeleton className="h-35" />
        <Skeleton className="" />
        <Skeleton className="" />
        <Skeleton className="" />
        <Skeleton className="" />
        <Skeleton className="" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-12 w-35" />
        <Skeleton className="h-12 w-35" />
      </div>
    </main>
  )
}

export default Loading