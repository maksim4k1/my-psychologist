import { cookies } from "next/headers";
import { StoreProvider } from "@/client/redux";
import { cookies as cookiesData } from "@/shared/data/cookies";
import { getInitialState } from "@/shared/utils";
import { type FC, type ReactNode } from "react";

interface StoreLayoutProps {
  children: ReactNode;
}

export const StoreLayer: FC<StoreLayoutProps> = async ({ children }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(cookiesData.accessToken.name)?.value;

  const initialState = await getInitialState(accessToken);

  return <StoreProvider initialState={initialState}>{children}</StoreProvider>;
};
