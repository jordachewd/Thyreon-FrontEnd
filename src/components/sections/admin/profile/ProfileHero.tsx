"use client";
import css from "@/styles/sections/admin/ProfileHero.module.css";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { Typography, Avatar } from "@mui/material";
import { getAvatarInitials } from "@/lib/utils/getAvatarInitials";
import { UserRole } from "@/types/users/user-role.d";
import { GetUserData } from "@/types/users/get-user-data.d";
import PlanPromo from "@/components/shared/PlanPromo";
import { gql, useQuery } from "@apollo/client";
import { memo } from "react";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import ProfileHeroWrapper from "./ProfileHeroWrapper";
import { Transaction } from "@/types/transactions/transaction.d";
import ErrorCard from "@/components/shared/ErrorCard";

const GET_MY_PROFILE_QUERY = gql`
  query GetMe {
    me {
      role
      clerkImg
      firstName
      lastName
      username
      createdAt
      updatedAt
      currentPlan {
        billing
      }
    }
  }
`;

function ProfileHero() {
  const { data, loading, error } = useQuery<{ me: GetUserData }>(
    GET_MY_PROFILE_QUERY
  );

  if (loading)
    return (
      <ProfileHeroWrapper>
        <LoadingBubbles wrapped />
      </ProfileHeroWrapper>
    );

  if (error)
    return (
      <ProfileHeroWrapper>
        <ErrorCard error={error.message} title="" backToUrl="" />
      </ProfileHeroWrapper>
    );

  const profile = data?.me as GetUserData | undefined;
  const currentPlan = profile?.currentPlan as Transaction | undefined;
  const fullName = `${profile?.firstName} ${profile?.lastName}`;

  return (
    <ProfileHeroWrapper>
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
          <span className="text-xxs leading-none">
            {getFormattedDate(profile?.createdAt as Date)}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <span className="font-semibold leading-none">Last update:</span>
          <span className="text-xxs leading-none">
            {getFormattedDate(profile?.updatedAt as Date)}
          </span>
        </div>
      </div>

      <div className={css.heroPlan}>
        <PlanPromo userPlan={currentPlan} userRole={profile?.role} />
      </div>
    </ProfileHeroWrapper>
  );
}

export default memo(ProfileHero);
