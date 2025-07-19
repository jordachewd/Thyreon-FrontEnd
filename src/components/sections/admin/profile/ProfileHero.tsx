"use client";

import css from "@/styles/sections/admin/ProfileHero.module.css";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { Typography, Avatar } from "@mui/material";
import { getAvatarInitials } from "@/lib/utils/getAvatarInitials";
import { UserRole } from "@/types/users/user-role.d";
import { GetUserData } from "@/types/users/get-user-data.d";
import PlanPromo from "@/components/shared/PlanPromo";
import { ApolloError } from "@apollo/client";
import { memo } from "react";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import ProfileHeroWrapper from "./ProfileHeroWrapper";
import { Transaction } from "@/types/transactions/transaction.d";
import ErrorCard from "@/components/shared/ErrorCard";

type ProfileHeroProps = {
  data: { profile: GetUserData | undefined };
  loading: boolean;
  error: ApolloError | undefined;
  isAdmin: boolean;
  title?: string;
  alignTitle?: "left" | "center" | "right";
  titleSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

function ProfileHero({
  data,
  loading,
  error,
  title,
  alignTitle,
  titleSize,
  isAdmin = false,
}: ProfileHeroProps) {
  if (loading)
    return (
      <ProfileHeroWrapper
        title={title}
        alignTitle={alignTitle}
        size={titleSize}
      >
        <LoadingBubbles wrapped />
      </ProfileHeroWrapper>
    );

  if (error)
    return (
      <ProfileHeroWrapper
        title={title}
        alignTitle={alignTitle}
        size={titleSize}
      >
        <ErrorCard error={error.message} title="" backToUrl="" />
      </ProfileHeroWrapper>
    );

  const profile = data.profile as GetUserData | undefined;
  const currentPlan = profile?.currentPlan as Transaction | undefined;
  const fullName = `${profile?.firstName} ${profile?.lastName}`;

  return (
    <ProfileHeroWrapper title={title} alignTitle={alignTitle} size={titleSize}>
      <div className={css.heroImg}>
        <Avatar
          alt={profile?.username}
          src={profile?.clerkImg ?? undefined}
          sx={{ width: 80, height: 80 }}
          {...getAvatarInitials(fullName)}
        />
        <div className={css.heroImgContent}>
          <Typography variant="h4">{fullName}</Typography>
          <Typography variant="body2">@{profile?.username}</Typography>
        </div>
      </div>

      <div className={css.heroContent}>
        <div className="flex gap-2 items-center">
          <span className="font-semibold leading-none">Role:</span>
          <span className="capitalize leading-none">
            {profile?.role as UserRole}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <span className="font-semibold leading-none">Member since:</span>
          <span className="textxxs leading-none">
            {getFormattedDate(profile?.createdAt as Date)}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <span className="font-semibold leading-none">Last update:</span>
          <span className="textxxs leading-none">
            {getFormattedDate(profile?.updatedAt as Date)}
          </span>
        </div>
      </div>

      <div className={css.heroPlan}>
        <PlanPromo
          userPlan={currentPlan}
          userRole={profile?.role}
          isAdmin={isAdmin}
        />
      </div>
    </ProfileHeroWrapper>
  );
}

export default memo(ProfileHero);
