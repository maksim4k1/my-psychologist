import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";
import IconButton from "../Button/IconButton";
import YandexIcon from "@/assets/svg/Icons/YandexIcon";
import VkIcon from "@/assets/svg/Icons/VkIcon";

interface Props {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const AuthButtons: FunctionComponent<Props> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`${styles.authContainer} ${className}`}
      {...props}
    >
      {children}
      <span className={styles.labelText}>или войти с помощью</span>
      <div className={styles.iconButtons}>
        <IconButton type="button">
          <YandexIcon />
        </IconButton>
        <IconButton type="button">
          <VkIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AuthButtons;