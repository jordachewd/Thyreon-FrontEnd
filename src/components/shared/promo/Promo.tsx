import { useAdminAuth } from "@/context/AdminAuthContext";
import { useUserData } from "@/lib/hooks/users/single/useUserData";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { Typography, Button } from "@mui/material";
import { memo } from "react";
import css from "@/styles/shared/PlanPromo.module.css";
import ErrorCard from "../ErrorCard";
import LoadingBubbles from "../LoadingBubbles";
import PromoWrapper from "./PromoWrapper";

const TITLE_SX = {
  color: "var(--mui-palette-tertiary-contrastText)",
  textTransform: "capitalize",
  alignItems: "center",
  display: "flex",
  gap: "1rem",
};

function Promo() {
  const { isAdmin: isAuthAdmin } = useAdminAuth();
  const { loading, error, userInfo } = useUserData();

  if (loading)
    return (
      <PromoWrapper>
        <LoadingBubbles size="small" />
      </PromoWrapper>
    );

  if (error)
    return (
      <PromoWrapper>
        <ErrorCard mini error={error.message} />
      </PromoWrapper>
    );

  const { role: userRole, currentPlan: userPlan } = userInfo;
  const { billing, expiresAt } = userPlan || {};

  const planUntil = expiresAt ? getFormattedDate(expiresAt) : "N/A";
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

export default memo(Promo);
