import { type StaticImageData } from "next/image";
import Cbt from "@/client/assets/webp/partners/cbt.webp";
import Dialectica from "@/client/assets/webp/partners/dialectica.webp";
import Fasie from "@/client/assets/webp/partners/fasie.webp";
import Gazprom from "@/client/assets/webp/partners/gazprom.webp";
import Mercuria from "@/client/assets/webp/partners/mercuria.webp";
import Tokp from "@/client/assets/webp/partners/tokp.webp";
import Tsu from "@/client/assets/webp/partners/tsu.webp";
import Tusur from "@/client/assets/webp/partners/tusur.webp";

export interface Partner {
  name: string;
  image: StaticImageData;
  link: string;
}

export const partners: Partner[] = [
  {
    name: "Меркурия Благотворительный Фонд",
    image: Mercuria,
    link: "https://mercuriya.ru/about",
  },
  {
    name: "Томский государственный университет систем управления и радиоэлектроники",
    image: Tusur,
    link: "https://tusur.ru/ru",
  },
  {
    name: "Газпром Трансгаз Томск",
    image: Gazprom,
    link: "https://tomsk-tr.gazprom.ru/",
  },
  {
    name: "Dialectica Центр найчно-практической психологии",
    image: Dialectica,
    link: "https://cnpp.ru/",
  },
  {
    name: "Фонд содействия инновациям",
    image: Fasie,
    link: "https://fasie.ru/",
  },
  {
    name: "Национальный Исследовательский Томский Государственный Университет",
    image: Tsu,
    link: "https://www.tsu.ru/",
  },
  {
    name: "ОГАУЗ Томская Клиническая Психиотрическая Больница",
    image: Tokp,
    link: "https://tokpb.ru/main/",
  },
  {
    name: "Ассоциация когнитивно-бихевиоральных терапевтов",
    image: Cbt,
    link: "https://russian-cbt.ru/",
  },
];
