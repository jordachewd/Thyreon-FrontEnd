"use client";

import { UserButton } from "@clerk/nextjs";
import UserSkeleton from "./UserSkeleton";

type ClerkUserButton = {
  isFrontEnd?: boolean;
  showName?: boolean;
};

export default function UserButtonMenu({
  isFrontEnd,
  showName,
}: ClerkUserButton) {
  const homeIcon = isFrontEnd ? "bi-grid-fill" : "bi-house-fill";

  return (
    <UserButton
      showName={showName}
      fallback={<UserSkeleton showName={showName} />}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label={isFrontEnd ? "Dashboard" : "Home"}
          labelIcon={<i className={`bi ${homeIcon}`}></i>}
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
      </UserButton.MenuItems>
    </UserButton>
  );
}
