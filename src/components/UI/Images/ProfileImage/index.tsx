import { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface Props {
  src: string;
  alt: string;
  size: number;
  className?: string;
  [key: string]: any;
}

const ProfileImage: FunctionComponent<Props> = ({
  src,
  alt,
  size,
  className = "",
  ...props
}) => {
  return (
    <img
      style={{ width: size + "px", height: size + "px" }}
      className={`${styles.image} ${className}`}
      src={src}
      alt={alt}
      {...props}
    />
  );
};

export default ProfileImage;
