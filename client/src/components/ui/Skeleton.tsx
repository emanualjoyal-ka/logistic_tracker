type SkeletonProps = {
  className?: string;
};

const Skeleton=({ className = "" }: SkeletonProps)=> {
  return (
    <div className={`animate-pulse rounded-md bg-white/20 ${className}`} aria-hidden="true"/>
  );
}

export default Skeleton;