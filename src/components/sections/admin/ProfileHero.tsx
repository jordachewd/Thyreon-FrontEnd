"use client";
import css from "@/styles/sections/admin/ProfileHero.module.css";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import PageHead from "@/components/shared/PageHead";
import { Typography, Avatar } from "@mui/material";
import { getAvatarInitials } from "@/lib/utils/getAvatarInitials";
import { UserRole } from "@/types/users/user-role.d";
import { GetUserData } from "@/types/users/get-user-data.d";
import PlanPromo from "@/components/shared/PlanPromo";
import { memo } from "react";

interface ProfileHeroProps {
  profile: GetUserData;
}

function ProfileHero({ profile }: ProfileHeroProps) {
  const {
    clerkImg,
    firstName,
    lastName,
    username,
    role,
    currentPlan,
    createdAt,
    updatedAt,
  } = profile;
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`;

  return (
    <section className={css.section}>
      <PageHead title="Profile Overview" />

      <div className={css.hero}>
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
            <span className="text-xxs leading-none">
              {getFormattedDate(createdAt as Date)}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="font-semibold leading-none">Last update:</span>
            <span className="text-xxs leading-none">
              {getFormattedDate(updatedAt as Date)}
            </span>
          </div>
        </div>

        <div className={css.heroPlan}>
          <PlanPromo userPlan={currentPlan} userRole={role} />
        </div>
      </div>
    </section>
  );
}

export default memo(ProfileHero);
