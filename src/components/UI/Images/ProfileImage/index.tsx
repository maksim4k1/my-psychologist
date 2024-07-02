import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import DefaultAvatar from "@/assets/svg/Icons/DefaultAvatarIcon";

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
    <>
      {src === "" ? (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            minWidth: `${size}px`,
          }}
          className={`${styles.svgContainer} ${className}`}
        >
          <DefaultAvatar />
        </div>
      ) : (
        <Image
          width={size}
          height={size}
          className={`${styles.image} ${className}`}
          src={src}
          alt={alt}
          {...props}
        />
      )}
    </>
  );
};

export default ProfileImage;
