import getFormattedDate from "@/lib/utils/getFormattedDate";
import { GetUserInfo } from "@/types/users/get-user-info.d";
import { UserRole } from "@/types/users/user-role.d";
import { Typography, Button } from "@mui/material";
import css from "@/styles/shared/PlanPromo.module.css";
import PromoWrapper from "./PromoWrapper";

const TITLE_SX = {
  color: "var(--mui-palette-tertiary-contrastText)",
  textTransform: "capitalize",
  alignItems: "center",
  display: "flex",
  gap: "1rem",
};

type PromoProps = {
  role: UserRole;
  userInfo: GetUserInfo;
};

export default function Promo({ role, userInfo }: PromoProps) {
  const { role: userRole, currentPlan: userPlan } = userInfo;
  const { billing, expiresAt } = userPlan || {};

  const planUntil = expiresAt ? getFormattedDate(expiresAt) : "N/A";
  const isAuthAdmin = role === "admin";
  const showBadge = !isAuthAdmin && userRole !== "admin" && billing;

  return (
    <PromoWrapper>
      {showBadge && (
        <div className={css.badge}>
          <span className={css.badgeValue}>{billing}</span>
        </div>
      )}

      <Typography variant="h6" sx={TITLE_SX}>
        {userRole}
      </Typography>

      <div className={css.details}>
        {userRole === "admin"
          ? "You have unrestricted access all-over."
          : isAuthAdmin
          ? "Until: " + planUntil
          : "Unlock premium features!"}
      </div>

      {!isAuthAdmin && (
        <Button size="small" href="/plans" variant="contained">
          {userRole === "admin" ? "See plans" : "Upgrade plan"}
        </Button>
      )}
    </PromoWrapper>
  );
}
