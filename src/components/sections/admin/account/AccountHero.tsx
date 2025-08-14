"use client";

import css from "@/styles/sections/admin/AccountHero.module.css";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import PlanPromo from "@/components/shared/PlanPromo";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getAvatarInitials } from "@/lib/utils/getAvatarInitials";
import { UserRole } from "@/types/users/user-role.d";
import { memo, useMemo } from "react";
import { AccountHeroType} from "@/types/account/account-hero.d";
import ProfileWrapper from "./AccountWrapper";
import { GetUserData } from "@/types/users/get-user-data.d";

function AccountHero({
  data,
  title,
  alignTitle,
  titleSize,
}: AccountHeroType) {
  if (!data) {
    return (
      <ProfileWrapper
        hero
        title={title}
        alignTitle={alignTitle}
        titleSize={titleSize}
      >
        No data yet.
      </ProfileWrapper>
    );
  }

  const {
    username,
    firstName,
    lastName,
    clerkImg,
    role,
    currentPlan,
    createdAt,
    updatedAt,
  } = data as GetUserData;

  const fullName = useMemo(
    () => `${firstName} ${lastName}`,
    [firstName, lastName]
  );
  const isAdmin = role === "admin";

  return (
    <ProfileWrapper hero title={title} alignTitle={alignTitle} titleSize={titleSize}>
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
        <Typography variant="h6">Details</Typography>

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
    </ProfileWrapper>
  );
}

export default memo(AccountHero);
