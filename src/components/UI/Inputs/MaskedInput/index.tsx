"use client";

import { FunctionComponent } from "react";
import styles from "../styles.module.scss";
import { IMaskInput } from "react-imask";

interface Props {
  errorText?: string;
  className?: string;
  [key: string]: any;
}

const MaskedInput: FunctionComponent<Props> = ({
  errorText,
  className = "",
  ...props
}) => {
  return (
    <div className={styles.label}>
      <IMaskInput
        className={`${styles.input} ${
          errorText ? styles.error : ""
        } ${className}`}
        {...props}
      />
      {!!errorText && <div className={styles.errorText}>{errorText}</div>}
    </div>
  );
};

export default MaskedInput;

{
  /* <IMaskInput
  name="birthday"
  mask={Date}
  max={new Date()}
  onAccept={(value, mask) => console.log(value, mask)}
  unmask={false}
  placeholder="Дата рождения  (ДД.ММ.ГГГГ)"
  value={birthday.value}  
/> */
}
