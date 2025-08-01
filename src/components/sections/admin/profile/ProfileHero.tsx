"use client";

import css from "@/styles/sections/admin/ProfileHero.module.css";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import PlanPromo from "@/components/shared/PlanPromo";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import ProfileHeroWrapper from "./ProfileHeroWrapper";
import ErrorCard from "@/components/shared/ErrorCard";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getAvatarInitials } from "@/lib/utils/getAvatarInitials";
import { UserRole } from "@/types/users/user-role.d";
import { GetUserData } from "@/types/users/get-user-data.d";
import { ApolloError } from "@apollo/client";
import { Transaction } from "@/types/transactions/transaction.d";
import { memo } from "react";

type ProfileHeroProps = {
  data: { profile: GetUserData };
  loading: boolean;
  error: ApolloError | undefined;
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
}: ProfileHeroProps) {
  const profile = data.profile as GetUserData;
  const currentPlan = profile?.currentPlan as Transaction;
  const fullName = `${profile?.firstName} ${profile?.lastName}`;
  const isAdmin = profile?.role === "admin";

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
          <span className="font-semibold leading-none">Last seen:</span>
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
