import getFormattedDate from "@/lib/utils/getFormattedDate";
import { GetUserInfo } from "@/types/users/get-user-info.d";
import { UserRole } from "@/types/users/user-role.d";
import { Typography, Button } from "@/components/ui";
import PromoWrapper from "./PromoWrapper";
import Link from "next/link";

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
        <div className="absolute top-0.5 right-0.5 z-10 font-medium gap-1 flex items-center">
          <span className="px-1 py-0.5 rounded-[5px] uppercase textxxs bg-vanilla-400 text-midnight-500 leading-none dark:bg-midnight-400 dark:text-vanilla-400 tracking-wider">{billing}</span>
        </div>
      )}

      <Typography variant="h6" className="text-tertiary-contrast-text capitalize flex items-center gap-4">
        {userRole}
      </Typography>

      <div className="flex w-full items-center justify-center lg:justify-start text-xs pt-3 border-t border-dotted border-vanilla-900/50">
        {userRole === "admin"
          ? "You have unrestricted access all-over."
          : isAuthAdmin
          ? "Until: " + planUntil
          : "Unlock premium features!"}
      </div>

      {!isAuthAdmin && (
        <Link href="/plans">
          <Button size="small" variant="primary">
            {userRole === "admin" ? "See plans" : "Upgrade plan"}
          </Button>
        </Link>
      )}
    </PromoWrapper>
  );
}
