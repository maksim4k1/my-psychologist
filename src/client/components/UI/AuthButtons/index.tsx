import { IconButton } from "../Buttons";
import styles from "./styles.module.scss";
import { VkIcon, YandexIcon } from "@/client/assets/icons";
import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export const AuthButtons: FC<Props> = ({
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
