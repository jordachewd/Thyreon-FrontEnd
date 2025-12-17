import { Skeleton } from "@/components/ui";
import { memo } from "react";

type UserSkeletonProps = {
  showName?: boolean;
};

function UserSkeleton({ showName = false }: UserSkeletonProps) {
  return (
    <div className="flex items-center gap-2">
      {showName && <Skeleton width={100} height={16} />}
      <Skeleton variant="circular" width={28} height={28} />
    </div>
  );
}

export default memo(UserSkeleton);
