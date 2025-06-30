"use client";
import css from "@/styles/sections/ProfileHero.module.css";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import PageHead from "@/components/shared/PageHead";
import { Typography, Avatar } from "@mui/material";
import { getAvatarInitials } from "@/lib/utils/getAvatarInitials";
import { useUser } from "@clerk/nextjs";
import LoadingBubbles from "../shared/LoadingBubbles";

export default function ProfileHero() {
  const { user, isLoaded } = useUser();

  return (
    <section className={css.section}>
      <PageHead title="Profile Overview" />

      <div className={css.hero}>
        {!isLoaded && <LoadingBubbles wrapped />}
        {isLoaded && (
          <>
            <div className={css.heroImg}>
              <Avatar
                alt={user?.fullName ?? undefined}
                src={user?.imageUrl ?? undefined}
                sx={{ width: 80, height: 80 }}
                {...getAvatarInitials(user?.fullName ?? "")}
              />
              <div className={css.heroImgContent}>
                <Typography variant="h4">{user?.fullName}</Typography>
                <Typography variant="body2">@{user?.username}</Typography>
              </div>
            </div>

            <div className={css.heroContent}>
              <div className="flex gap-2 items-center">
                <span className="font-semibold leading-none">
                  Member since:
                </span>
                <span className="text-xxs leading-none">
                  {getFormattedDate(user?.createdAt as Date)}
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <span className="font-semibold leading-none">Last update:</span>
                <span className="text-xxs leading-none">
                  {getFormattedDate(user?.updatedAt as Date)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
