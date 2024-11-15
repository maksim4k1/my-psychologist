"use client";

import { PrimaryButton } from "../../../Buttons";
import { ProfileButton } from "./components";
import { useAppSelector } from "@/client/hooks";
import { selectIsAuth } from "@/client/redux";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const RightButton: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <>
      {isAuth ? (
        <ProfileButton />
      ) : (
        <PrimaryButton href={pages.login.path}>Войти</PrimaryButton>
      )}
    </>
  );
};