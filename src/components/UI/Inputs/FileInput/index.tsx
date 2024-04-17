"use client";

import {
  ChangeEvent,
  DragEventHandler,
  FocusEvent,
  FunctionComponent,
  useRef,
  useState,
} from "react";
import styles from "../styles.module.scss";
import localStyles from "./styles.module.scss";

interface Props {
  labelText?: string;
  exampleText?: string;
  errorText?: string;
  className?: string;
  multiple?: boolean;
  onChoose?: (input: HTMLInputElement) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

const FileInput: FunctionComponent<Props> = ({
  labelText,
  exampleText,
  errorText,
  className = "",
  multiple = false,
  onChoose,
  onBlur,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDropHandler: DragEventHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (inputRef.current && inputRef.current.files) {
      if (multiple) {
        setFileNames(Array.from(event.dataTransfer.files).map((el) => el.name));
        inputRef.current.files = event.dataTransfer.files;
      } else {
        setFileNames([event.dataTransfer.files[0].name]);
        const dt = new DataTransfer();
        dt.items.add(event.dataTransfer.files[0]);
        inputRef.current.files = dt.files;
      }

      if (onChoose) {
        onChoose(inputRef.current);
      }
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
      if (multiple) {
        setFileNames(Array.from(event.target.files).map((el) => el.name));
      } else {
        setFileNames([event.target.files[0].name]);
      }
    }

    if (onChoose) {
      onChoose(event.target);
    }

    setIsActive(false);
  };

  const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocus(false);

    if (onBlur) {
      onBlur(event);
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
        className={`${styles.input} ${localStyles.label} ${
          isActive ? localStyles.active : ""
        } ${isFocus ? localStyles.focus : ""} ${
          errorText ? styles.error : ""
        } ${className}`}
      >
        {!!fileNames.length && (
          <ul className={localStyles.fileNames}>
            {fileNames.map((el, index, arr) => (
              <span
                key={index}
                className={localStyles.fileName}
              >
                {arr.length > 1 ? `${index + 1}. ${el}` : el}
              </span>
            ))}
          </ul>
        )}
        <span className={localStyles.primaryPlaceholder}>
          Выберите файлы...
        </span>
        <span className={localStyles.secondaryPlaceholder}>
          или перетащите их сюда
        </span>
        <input
          onFocus={() => setIsFocus(true)}
          onBlur={onBlurHandler}
          className={localStyles.input}
          {...props}
          ref={inputRef}
          type="file"
          onChange={onChangeHandler}
          multiple={multiple}
        />
      </label>
      {!!errorText && <div className={styles.errorText}>{errorText}</div>}
    </div>
  );
};

export default FileInput;
