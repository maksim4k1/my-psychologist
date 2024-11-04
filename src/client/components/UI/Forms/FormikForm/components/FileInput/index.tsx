"use client";

import styles from "./styles.module.scss";
import { type FieldConfig, useField } from "formik";
import {
  type ChangeEvent,
  type DragEventHandler,
  type FC,
  type FocusEvent,
  type InputHTMLAttributes,
  useState,
} from "react";

type Props = FieldConfig &
  InputHTMLAttributes<HTMLInputElement> & {
    labelText?: string;
    exampleText?: string;
  };

export const FileInput: FC<Props> = ({ labelText, exampleText, ...props }) => {
  const [isActive, setIsActive] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [field, meta, helpers] = useField<FileList | null>(props.name);

  const onDropHandler: DragEventHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (props.multiple) {
      setFileNames(Array.from(event.dataTransfer.files).map((el) => el.name));
      const dt = new DataTransfer();
      for (const el of Array.from(event.dataTransfer.files)) {
        dt.items.add(el);
      }
      helpers.setValue(dt.files ?? null);
    } else {
      setFileNames([event.dataTransfer.files[0].name]);
      const dt = new DataTransfer();
      const el = Array.from(event.dataTransfer.files)[0];
      dt.items.add(el);
      helpers.setValue(dt.files ?? null);
    }

    setIsActive(false);
  };

  const onDragOverHandler: DragEventHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onDragEnterHandler: DragEventHandler = () => {
    setIsActive(true);
  };

  const onDragEndHandler: DragEventHandler = () => {
    setIsActive(false);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.files) {
      const dt = new DataTransfer();
      for (const el of Array.from(event.target.files)) {
        dt.items.add(el);
      }
      helpers.setValue(dt.files ?? null);
      if (props.multiple) {
        setFileNames(Array.from(event.target.files).map((el) => el.name));
      } else {
        setFileNames([event.target.files[0].name]);
      }
    }

    setIsActive(false);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocus(false);

    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  return (
    <div className={styles.label}>
      {(!!labelText || !!exampleText) && (
        <div>
          {!!labelText && (
            <span
              className={`${styles.labelText} ${
                props.required ? styles.required : ""
              }`}
            >
              {labelText}
            </span>
          )}
          {!!exampleText && (
            <span className={styles.exampleText}>{exampleText}</span>
          )}
        </div>
      )}
      <label
        onDrop={onDropHandler}
        onDragOver={onDragOverHandler}
        onDragEnter={onDragEnterHandler}
        onDragLeave={onDragEndHandler}
        onDragEnd={onDragEndHandler}
        className={`${styles.input} ${styles.labelEl} ${
          isActive ? styles.active : ""
        } ${isFocus ? styles.focus : ""} ${
          meta.error && meta.touched ? styles.error : ""
        } ${props.className ?? ""}`}
      >
        {!!fileNames.length && (
          <ul className={styles.fileNames}>
            {fileNames.map((el, index, arr) => (
              <span
                key={index}
                className={styles.fileName}
              >
                {arr.length > 1 ? `${index + 1}. ${el}` : el}
              </span>
            ))}
          </ul>
        )}
        <span className={styles.primaryPlaceholder}>Выберите файлы...</span>
        <span className={styles.secondaryPlaceholder}>
          или перетащите их сюда
        </span>
        <input
          {...field}
          {...props}
          value=""
          onFocus={() => setIsFocus(true)}
          onBlur={onBlurHandler}
          className={styles.inputEl}
          type="file"
          onChange={onChangeHandler}
        />
      </label>
      {meta.error && meta.touched && (
        <div className={styles.errorText}>{meta.error}</div>
      )}
    </div>
  );
};
