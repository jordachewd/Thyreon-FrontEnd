"use client";

import { UserButton } from "@clerk/nextjs";
import { memo, useCallback } from "react";
import UserSkeleton from "./UserSkeleton";

type UserButtonMenuProps = {
  isFrontEnd?: boolean;
  showName?: boolean;
};

function UserButtonMenu(props: UserButtonMenuProps) {
  const { isFrontEnd = false, showName = false } = props;

  const HomeIcon = useCallback(() => {
    return (
      <i className={`bi ${isFrontEnd ? "bi-grid-fill" : "bi-house-fill"}`}></i>
    );
  }, [isFrontEnd]);

  return (
    <UserButton
      showName={showName}
      fallback={<UserSkeleton showName={showName} />}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label={isFrontEnd ? "Dashboard" : "Home"}
          labelIcon={<HomeIcon />}
          href={isFrontEnd ? "/dashboard" : "/"}
        />

        <UserButton.Link
          label="Upgrade Plan"
          labelIcon={<i className="bi bi-stars"></i>}
          href="/plans"
        />

        <UserButton.Link
          label="Account Overview"
          labelIcon={<i className="bi bi-person-fill"></i>}
          href="/account"
        />

        <UserButton.Action label="manageAccount" />
        <UserButton.Action label="signOut" />
      </UserButton.MenuItems>
    </UserButton>
  );
}

export default memo(UserButtonMenu);
