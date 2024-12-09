import styles from "./styles.module.scss";
import { Button, Modal } from "@/client/components";
import { type FC } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Вы уверены, что хотите удалить этот отзыв?"
      content={
        <>
          <div className={styles.modalButtons}>
            <Button onClick={onConfirm}>Удалить</Button>
            <Button onClick={onCancel}>Отмена</Button>
          </div>
        </>
      }
    />
  );
};
