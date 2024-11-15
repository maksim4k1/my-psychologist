"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/client/hooks";
import { selectRole } from "@/client/redux";
import { checkAccess } from "@/shared/utils";
import { type FC, type ReactNode, useEffect } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const userRole = useAppSelector(selectRole);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { path, operationType } = checkAccess(pathname, userRole);

    if (operationType === "redirect") {
      router.push(path);
    }
  }, [pathname, userRole, router]);

  return children;
};
