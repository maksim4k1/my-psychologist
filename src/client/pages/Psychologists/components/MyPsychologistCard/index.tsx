import { UserCard } from "@/client/components";
import { type GetPsychologistsResponseData } from "@/shared/types";
import { type FC } from "react";

interface Props {
  psychologist: GetPsychologistsResponseData[number];
}

export const MyPsychologistCard: FC<Props> = ({ psychologist }) => {
  return <UserCard userData={psychologist} />;
};
