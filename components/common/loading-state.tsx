import { FC } from "react";

interface LoadingStateProps {
  title?: string;
  className?: string;
}

const LoadingState: FC<LoadingStateProps> = ({
  title = "Loading...",
  className,
}) => {
  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <div
        className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
      <span>{title}</span>
    </div>
  );
};

LoadingState.displayName = "LoadingState";
export default LoadingState;
