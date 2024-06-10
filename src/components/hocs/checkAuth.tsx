"use client";

import { ACCESS, AccessRole } from "../../../config/access.config";
import { FunctionComponent, useEffect } from "react";
import AccessDeniedErrorPage from "../errors/AccessDenied";
import { useAppSelector } from "@/hooks/reduxHooks";
import {
  selectAuth,
  selectAuthLoginState,
} from "@/redux/features/auth/selectors";
import { usePathname, useRouter } from "next/navigation";
import LoadingLoop from "../UI/LoadingLoop";

function checkAuth(
  Component: FunctionComponent,
  isNeedAuth: boolean = false,
  accessFor: AccessRole[] = [ACCESS.public],
): FunctionComponent {
  return function CheckAuthComponent() {
    const { isAuth, role } = useAppSelector(selectAuth);
    const { isLoading } = useAppSelector(selectAuthLoginState);
    const router = useRouter();
    const pathname = usePathname();

    const isOnlyForUnauthorized =
      !isNeedAuth &&
      isAuth &&
      accessFor.includes(ACCESS.unauthorized) &&
      accessFor.length === 1;

    const isOnlyForAuthorized = isNeedAuth && !isAuth;

    const isOnlyForPsychologist =
      isAuth &&
      accessFor.includes(ACCESS.psychologist) &&
      accessFor.length === 1 &&
      role !== ACCESS.psychologist;

    useEffect(() => {
      if (!isLoading) {
        if (isOnlyForUnauthorized && pathname === "/auth/register")
          router.push("/auth/register/success");
        else if (isOnlyForUnauthorized) router.push("/");
        else if (isOnlyForAuthorized) router.push(`/auth/login`);
        else if (isOnlyForPsychologist) router.push(`/psychologist/survey`);
      }
    }, [
      isOnlyForUnauthorized,
      isOnlyForAuthorized,
      isOnlyForPsychologist,
      router,
      pathname,
      isLoading,
    ]);

    if (isOnlyForUnauthorized || isOnlyForAuthorized || isOnlyForPsychologist)
      return <LoadingLoop />;

    if (
      accessFor.includes(ACCESS.public) ||
      accessFor.includes(role) ||
      (isAuth && accessFor.includes(ACCESS.client))
    ) {
      return <Component />;
    }

    return <AccessDeniedErrorPage />;
  };
}

export default checkAuth;
