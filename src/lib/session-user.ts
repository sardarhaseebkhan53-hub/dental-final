import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { AuthUser } from "@/types";
import type { UserRole } from "@/types/prisma-enums";

export async function requireDashboardUser(allowedRoles: UserRole[]) {
  const session = await auth();
  const role = session?.user?.role;

  if (!session?.user || !role || !allowedRoles.includes(role)) {
    redirect("/login");
  }

  return {
    id: session.user.id,
    email: session.user.email ?? "",
    name: session.user.name ?? "Clinic User",
    role,
    image: session.user.image,
  } satisfies AuthUser;
}
