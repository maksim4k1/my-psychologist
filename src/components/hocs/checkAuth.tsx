"use client";

import { ACCESS, type AccessRole } from "../../config/access.config";
import AccessDeniedError from "../errors/AccessDeniedError";
import LoadingLoop from "../statusLabels/LoadingLoop";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { authActions } from "@/redux/features/auth";
import {
  selectAuth,
  selectAuthLoginState,
  selectRole,
} from "@/redux/features/auth/selectors";
import { type FunctionComponent, useEffect } from "react";

function checkAuth(
  Component: FunctionComponent,
  isNeedAuth: boolean = false,
  accessFor: AccessRole[] = [ACCESS.public],
): FunctionComponent {
  return function CheckAuthComponent() {
    const { isAuth } = useAppSelector(selectAuth);
    const role = useAppSelector(selectRole);
    const { isLoading, isSuccess } = useAppSelector(selectAuthLoginState);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const isOnlyForUnauthorized =
      !isNeedAuth &&
      isAuth &&
      accessFor.includes(ACCESS.unauthorized) &&
      accessFor.length === 1;

    const isOnlyForAuthorized = isNeedAuth && !isAuth;

    const forPsychologistAndHr =
      isAuth &&
      accessFor.includes(ACCESS.psychologist) &&
      accessFor.includes(ACCESS.hr) &&
      accessFor.length === 2 &&
      role !== ACCESS.psychologist &&
      role !== ACCESS.hr;

    const isOnlyForPsychologist =
      isAuth &&
      accessFor.includes(ACCESS.psychologist) &&
      accessFor.length === 1 &&
      role !== ACCESS.psychologist;

    const isOnlyForHr =
      isAuth &&
      accessFor.includes(ACCESS.hr) &&
      accessFor.length === 1 &&
      role !== ACCESS.hr;

    useEffect(() => {
      if (!isLoading) {
        if (pathname === "/auth/register" && isOnlyForUnauthorized)
          router.push(`/auth/register/success`);
        else if (isOnlyForUnauthorized) router.push("/profile");
        else if (isOnlyForAuthorized) router.push(`/auth/login`);
        else if (forPsychologistAndHr) router.push(`/auth/register/success`);
        else if (isOnlyForPsychologist) router.push(`/survey/psychologist`);
        else if (isOnlyForHr) router.push(`/survey/hr`);
      }
    }, [
      isOnlyForUnauthorized,
      forPsychologistAndHr,
      isOnlyForAuthorized,
      isOnlyForPsychologist,
      isOnlyForHr,
      router,
      pathname,
      isLoading,
    ]);

    useEffect(() => {
      if (isSuccess) {
        dispatch(authActions.loginSetDefaultState());
      }
    }, [isSuccess, dispatch]);

    if (isOnlyForUnauthorized || isOnlyForAuthorized || isOnlyForPsychologist)
      return <LoadingLoop />;

    if (
      accessFor.includes(ACCESS.public) ||
      accessFor.includes(role) ||
      (isAuth && accessFor.includes(ACCESS.client))
    ) {
      return <Component />;
    }

    return <AccessDeniedError />;
  };
}

export default checkAuth;
