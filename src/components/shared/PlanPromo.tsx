import css from "@/styles/shared/PlanPromo.module.css";
import { Transaction } from "@/types/transactions/transaction.d";
import { UserRole } from "@/types/users/user-role.d";
import { Button, Typography } from "@mui/material";
import { memo } from "react";

interface PlanPromoProps {
  userRole: UserRole | undefined;
  userPlan: Transaction | undefined;
}

function PlanPromo({ userRole, userPlan }: PlanPromoProps) {
  const { billing } = userPlan || {};
  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        {userRole !== "admin" && (
          <div className={css.badge}>
            <span className={css.badgeValue}>{billing}</span>
          </div>
        )}

        <Typography
          variant="h6"
          sx={{
            color: "var(--mui-palette-tertiary-contrastText)",
            textTransform: "capitalize",
            alignItems: "center",
            display: "flex",
            gap: "1rem",
          }}
        >
          {userRole}
        </Typography>

        <div className={css.details}>
          {userRole === "admin"
            ? "You have unrestricted access all-over."
            : "Unlock premium features!"}
        </div>

        <Button size="small" href="/plans" variant="contained">
          {userRole === "admin" ? "See plans" : "Upgrade plan"}
        </Button>
      </div>

      <div className={css.background}></div>
    </div>
  );
}

export default memo(PlanPromo);
