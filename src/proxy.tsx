import { NextResponse, type NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/401",
  "/404",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  try {
    const { userId, sessionClaims } = await auth();
    const isAdmin = sessionClaims?.role === "admin";

    if (!isPublicRoute(req) && !userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (isAdminRoute(req) && !isAdmin) {
      return NextResponse.redirect(new URL("/401", req.url));
    }
  } catch (error) {
    console.error("Error in proxy middleware:", error);

    if (error instanceof Error && "digest" in error) {
      console.error("Error digest:", error.digest);
    }

    return NextResponse.redirect(new URL("/404", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
