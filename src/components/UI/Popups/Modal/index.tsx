"use client";

import { FC, ReactNode, MouseEvent, useEffect } from "react";
import styles from "./styles.module.scss";
import CloseIcon from "@/assets/svg/Icons/CloseIcon";
import { createPortal } from "react-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
}

const Modal: FC<Props> = ({ isOpen, title, onClose, content }) => {
  const modalsPortal = document.getElementById("modals");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  }, [isOpen]);

  const clickContainerHandler = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const renderModal = () => {
    return (
      <div
        className={`${styles.container} ${isOpen ? styles.opened : ""}`}
        onClick={clickContainerHandler}
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <h4 className={styles.title}>{title}</h4>
            <button
              onClick={onClose}
              className={styles.closeButton}
            >
              <CloseIcon className={styles.closeIcon} />
            </button>
          </div>
          <div className={styles.main}>{content}</div>
        </div>
      </div>
    );
  };

  return modalsPortal && createPortal(renderModal(), modalsPortal);
};

export default Modal;
