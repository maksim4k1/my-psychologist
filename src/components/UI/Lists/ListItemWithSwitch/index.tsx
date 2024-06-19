import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import Switch from "../../Inputs/Switch";
import Link from "next/link";
import { QueryParams, mapToQueryParams } from "@/utils/urlUtils";

interface Props {
  label: string;
  link: string;
  className?: string;
  params?: QueryParams;
  [key: string]: any;
}

const ListItemWithSwitch: FunctionComponent<Props> = ({
  label,
  link,
  className = "",
  params,
  ...props
}) => {
  return (
    <li className={`${styles.item} ${className}`}>
      <Switch
        className={styles.switch}
        {...props}
      />
      <span className={styles.label}>{label}</span>
      <Link
        className={styles.link}
        href={link + mapToQueryParams(params)}
      >
        Перейти
      </Link>
    </li>
  );
};

export default ListItemWithSwitch;
