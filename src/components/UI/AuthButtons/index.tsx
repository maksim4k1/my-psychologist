import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";
import IconButton from "../Buttons/IconButton";
import YandexIcon from "@/assets/svg/icons/YandexIcon";
import VkIcon from "@/assets/svg/icons/VkIcon";

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
