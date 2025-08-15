import Skeleton from "@mui/material/Skeleton";
import { memo } from "react";

type UserSkeletonProps = {
  showName?: boolean;
};

function UserSkeleton({ showName = false }: UserSkeletonProps) {
  return (
    <div className="flex items-center gap-2">
      {showName && <Skeleton animation="wave" width={100} height={16} />}
      <Skeleton animation="wave" variant="circular" width={28} height={28} />
    </div>
  );
}

export default memo(UserSkeleton);
