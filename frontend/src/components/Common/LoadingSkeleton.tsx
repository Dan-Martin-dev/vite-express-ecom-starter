const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-gray-200 h-64 w-full rounded"></div>
      <div className="bg-gray-200 h-64 w-full rounded"></div>
      <div className="bg-gray-200 h-64 w-full rounded"></div>
    </div>
  );
};

export default LoadingSkeleton;