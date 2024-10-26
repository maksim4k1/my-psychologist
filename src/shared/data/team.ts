import { type StaticImageData } from "next/image";
import AlexanderPak from "@/client/assets/webp/team/AlexanderPak.webp";
import AlinaTisheva from "@/client/assets/webp/team/AlinaTishaeva.webp";
import DaniilKostin from "@/client/assets/webp/team/DaniilKostin.webp";
import DmitryBespalov from "@/client/assets/webp/team/DmitryBespalov.webp";
import IlyaFomin from "@/client/assets/webp/team/IlyaFomin.webp";
import IslambekMaratov from "@/client/assets/webp/team/IslambekMaratov.webp";
import MaksimBazhenov from "@/client/assets/webp/team/MaksimBazhenov.webp";
import PavelPupenko from "@/client/assets/webp/team/PavelPupenko.webp";
import PolinaOzerova from "@/client/assets/webp/team/PolinaOzerova.webp";
import TimofeySimonov from "@/client/assets/webp/team/TimofeySimonov.webp";

export interface TeamMember {
  name: string;
  image: StaticImageData;
  role: string;
}

export const team: TeamMember[] = [
  {
    name: "Тимофей Симонов",
    image: TimofeySimonov,
    role: "руководитель, android-разработчик",
  },
  {
    name: "Илья Фомин",
    image: IlyaFomin,
    role: "android-разработчик",
  },
  {
    name: "Алина Тишаева",
    image: AlinaTisheva,
    role: "психолог",
  },
  {
    name: "Полина Озерова",
    image: PolinaOzerova,
    role: "дизайнер",
  },
  {
    name: "Даниил Костин",
    image: DaniilKostin,
    role: "дизайнер",
  },
  {
    name: "Максим Баженов",
    image: MaksimBazhenov,
    role: "frontend-разработчик",
  },
  {
    name: "Дмитрий Беспалов",
    image: DmitryBespalov,
    role: "backend-разработчик",
  },
  {
    name: "Александр Пак",
    image: AlexanderPak,
    role: "backend-разработчик",
  },
  {
    name: "Исламбек Маратов",
    image: IslambekMaratov,
    role: "backend-разработчик",
  },
  {
    name: "Павел Пупенко",
    image: PavelPupenko,
    role: "backend-разработчик",
  },
];
