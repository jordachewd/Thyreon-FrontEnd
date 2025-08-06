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

import { memo, useMemo } from "react";
import { ProfileSectionType } from "@/types/profile/profile-section.d";

function ProfileHero({
  data,
  loading,
  error,
  title,
  alignTitle,
  titleSize,
}: ProfileSectionType) {
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

  const {
    username,
    firstName,
    lastName,
    clerkImg,
    role,
    currentPlan,
    createdAt,
    updatedAt,
  } = data;

  const fullName = useMemo(
    () => `${firstName} ${lastName}`,
    [firstName, lastName]
  );
  const isAdmin = role === "admin";

  return (
    <ProfileHeroWrapper title={title} alignTitle={alignTitle} size={titleSize}>
      <div className={css.heroImg}>
        <Avatar
          alt={username}
          src={clerkImg ?? undefined}
          sx={{ width: 80, height: 80 }}
          {...getAvatarInitials(fullName)}
        />
        <div className={css.heroImgContent}>
          <Typography variant="h4">{fullName}</Typography>
          <Typography variant="body2">@{username}</Typography>
        </div>
      </div>

      <div className={css.heroContent}>
        <div className="flex gap-2 items-center">
          <span className="font-semibold leading-none">Role:</span>
          <span className="capitalize leading-none">{role as UserRole}</span>
        </div>

        <div className="flex gap-2 items-center">
          <span className="font-semibold leading-none">Member since:</span>
          <span className="textxxs leading-none">
            {getFormattedDate(createdAt as Date)}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <span className="font-semibold leading-none">Last seen:</span>
          <span className="textxxs leading-none">
            {getFormattedDate(updatedAt as Date)}
          </span>
        </div>
      </div>

      <div className={css.heroPlan}>
        <PlanPromo userPlan={currentPlan} userRole={role} isAdmin={isAdmin} />
      </div>
    </ProfileHeroWrapper>
  );
}

export default memo(ProfileHero);
