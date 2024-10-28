import IconButton from "../Buttons/IconButton";
import styles from "./styles.module.scss";
import VkIcon from "@/client/assets/svg/Icons/VkIcon";
import YandexIcon from "@/client/assets/svg/Icons/YandexIcon";
import { type FunctionComponent, type ReactNode } from "react";

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
      <span className={styles.labelText}>или</span>
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