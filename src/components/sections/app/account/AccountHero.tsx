"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { getAvatarInitials } from "@/lib/utils/getAvatarInitials";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { AccountHeroType } from "@/types/account/account-hero.d";
import { UserRole } from "@/types/users/user-role.d";
import { Avatar, Typography } from "@/components/ui";
import { useMemo, memo } from "react";
import AccountWrapper from "./AccountWrapper";
import Promo from "@/components/shared/promo/Promo";

type AccountHeroProps = AccountHeroType & {
  role: UserRole;
};

function AccountHero({
  userInfo,
  title,
  alignTitle,
  titleSize,
  loading,
  error,
  role,
}: AccountHeroProps) {
  if (loading) {
    return (
      <AccountWrapper
        hero
        title={title}
        alignTitle={alignTitle}
        titleSize={titleSize}
      >
        <LoadingBubbles />
      </AccountWrapper>
    );
  }

  if (error) {
    return (
      <AccountWrapper
        hero
        title={title}
        alignTitle={alignTitle}
        titleSize={titleSize}
      >
        <ErrorCard mini error={error.message} title="" />
      </AccountWrapper>
    );
  }

  if (!userInfo) {
    return (
      <AccountWrapper
        hero
        title={title}
        alignTitle={alignTitle}
        titleSize={titleSize}
      >
        <p>No data yet.</p>
      </AccountWrapper>
    );
  }

  const {
    username,
    firstName,
    lastName,
    clerkImg,
    role: userRole,
    createdAt,
    updatedAt,
  } = userInfo;

  const fullName = useMemo(
    () => `${firstName} ${lastName}`.trim(),
    [firstName, lastName]
  );
  const createdAtText = useMemo(
    () => getFormattedDate(new Date(createdAt as Date)),
    [createdAt]
  );
  const updatedAtText = useMemo(
    () => getFormattedDate(new Date(updatedAt as Date)),
    [updatedAt]
  );
  const avatarFallback = useMemo(() => getAvatarInitials(fullName), [fullName]);

  return (
    <AccountWrapper
      hero
      title={title}
      alignTitle={alignTitle}
      titleSize={titleSize}
    >
      <div className="account-hero-img">
        <Avatar
          alt={username ?? fullName}
          src={clerkImg ?? undefined}
          {...avatarFallback}
        />

        <div className="account-hero-img-content">
          <Typography variant="h4">{`${firstName} ${lastName}`}</Typography>
          <Typography variant="body2">@{username}</Typography>
        </div>
      </div>

      <div className="account-hero-content">
        <Typography variant="h6">Details</Typography>

        <div className="flex gap-2 items-center">
          <span className="font-semibold leading-none">Role:</span>
          <span className="capitalize leading-none">
            {userRole as UserRole}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <span className="font-semibold leading-none">Member since:</span>
          <span className="textxxs leading-none">{createdAtText}</span>
        </div>

        <div className="flex gap-2 items-center">
          <span className="font-semibold leading-none">Last seen:</span>
          <span className="textxxs leading-none">{updatedAtText}</span>
        </div>
      </div>

      <div className="account-hero-plan">
        <Promo role={role} userInfo={userInfo} />
      </div>
    </AccountWrapper>
  );
}

export default memo(AccountHero);
