import css from "@/styles/sections/ProfileHero.module.css";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import PageHead from "@/components/shared/PageHead";
import { Typography, Avatar } from "@mui/material";
import { UserData } from "@/types/user-data.d";
import getFullName from "@/lib/utils/getFullName";
import { getAvatarInitials } from "@/lib/utils/getAvatarInitials";

interface HeroProps {
  userData: UserData;
}

export default function ProfileHero({ userData }: HeroProps) {
  const { username, firstName, lastName, email, registerAt, updatedAt } =
    userData;

  const fullName = getFullName({
    firstName: firstName || "",
    lastName: lastName || "",
    username: username || "",
  });

  return (
    <section className={css.section}>
      <PageHead title="Profile" subtitle="Manage your account settings" />

      <div className={css.hero}>
        <div className={css.heroImg}>
          <Avatar
            alt={fullName}
            src={userData.userimg}
            sx={{ width: 80, height: 80 }}
            {...getAvatarInitials(fullName)}
          />
          <div className={css.heroImgContent}>
            <Typography variant="h4">{fullName}</Typography>
            <Typography variant="body1">{email}</Typography>
          </div>
        </div>

        <div className={css.heroContent}>
          <div className="flex gap-2 items-center">
            <span className="font-semibold leading-none">Member since:</span>
            <span className="text-xxs leading-none">
              {getFormattedDate(registerAt as Date)}
            </span>
          </div>

          {userData.updatedAt && (
            <div className="flex gap-2 items-center">
              <span className="font-semibold leading-none">Last update:</span>
              <span className="text-xxs leading-none">
                {getFormattedDate(updatedAt as Date)}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
