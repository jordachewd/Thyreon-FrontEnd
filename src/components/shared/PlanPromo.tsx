import getFormattedDate from "@/lib/utils/getFormattedDate";
import { TransactionType } from "@/types/transactions/transaction.d";
import { UserRole } from "@/types/users/user-role.d";
import { Typography, Button } from "@mui/material";
import { memo } from "react";
import css from "@/styles/shared/PlanPromo.module.css";
import { useAdminAuth } from "@/context/AdminAuthContext";

interface PlanPromoProps {
  userRole: UserRole | undefined;
  userPlan: TransactionType | undefined;
}

function PlanPromo({ userRole, userPlan }: PlanPromoProps) {
  const { isAdmin: isAuthAdmin } = useAdminAuth();
  const { billing, expiresAt } = userPlan || {};

  const planUntil = expiresAt ? getFormattedDate(expiresAt) : "N/A";

  const titleSx = {
    color: "var(--mui-palette-tertiary-contrastText)",
    textTransform: "capitalize",
    alignItems: "center",
    display: "flex",
    gap: "1rem",
  };

  const showBadge = isAuthAdmin && userRole !== "admin" && billing;

  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        {showBadge && (
          <div className={css.badge}>
            <span className={css.badgeValue}>{billing}</span>
          </div>
        )}

        <Typography variant="h6" sx={titleSx}>
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
      </div>

      <div className={css.background}></div>
    </div>
  );
}

export default memo(PlanPromo);
