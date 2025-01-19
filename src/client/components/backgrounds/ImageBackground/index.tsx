import styles from "./styles.module.scss";
import { type FC } from "react";

interface ImageBackgroundProps {
  src?: string;
}

const DEFAULT_IMAGE_URL =
  "https://s3-alpha-sig.figma.com/img/eee4/38b5/e275ffb2e5a9d126a26f6f848d560bf4?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IYHOImEId1erJe6EFB-JssWqFM9KlVAV1kT8IA9JtpjXiwZbanJstnxmrm4Sy5sQw2RFtSQ8HNVxH1DE-pc227SzwFpUqqRYZ7c68M94DCHTav9lJbpAUM-K5G5mcZ8L4q~6yQwfyJ6YAl4fhQK8FNsg2GRGj461XpGCXxuKKUsaCli31UZv6eeqSJrYvW45lymcwNXakQ~EyMNgRAZtr4ktCq4RMFhqLM0AELE3dbMtkt2I6anGKSSvza7gyQrLR8W6t8C6lGeFy2FSG~YoPA1fLp1d5rUgpWdmvEgo5XXe0T~jCbvjWK6N2rjNJTJJZcL27xskTMx6mqpWj4cyzg__";

export const ImageBackground: FC<ImageBackgroundProps> = ({
  src = DEFAULT_IMAGE_URL,
}) => {
  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url("${src}")` }}
    ></div>
  );
};
