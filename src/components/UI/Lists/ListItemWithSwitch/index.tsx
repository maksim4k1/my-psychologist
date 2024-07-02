import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import Switch from "../../Inputs/Switch";
import Link from "next/link";

interface Props {
  label: string;
  link: string;
  className?: string;
  [key: string]: any;
}

const ListItemWithSwitch: FunctionComponent<Props> = ({
  label,
  link,
  className = "",
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
        href={link}
      >
        Перейти
      </Link>
    </li>
  );
};

export default ListItemWithSwitch;
