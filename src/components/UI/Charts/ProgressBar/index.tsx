import { FunctionComponent, useState } from "react";
import styles from "./styles.module.scss";
import { BorderData } from "@/redux/features/tests/types";

interface Props {
  value: number;
  max: number;
  borders: BorderData[];
  className?: string;
}

const ProgressBar: FunctionComponent<Props> = ({
  value,
  max,
  borders,
  className = "",
}) => {
  const percent = max / 100;
  const valuePercent = value / percent;

  const color = borders.reduce((acc, el) => {
    if (value <= el.rightBorder && value >= el.leftBorder) {
      acc = el.color;
    }
    return acc;
  }, "");

  return (
    <div className={`${styles.contatiner} ${className}`}>
      <div className={styles.progressBar}>
        <div className={styles.progressLine}>
          <div
            className={styles.progress}
            style={{ width: `${valuePercent}%`, backgroundColor: color }}
          >
            <span className={styles.progressBarGap}></span>
          </div>
          <div
            className={`${styles.progressBarMaxValue} ${
              valuePercent === 100 ? styles.hidden : ""
            }`}
          ></div>
        </div>
        <div className={styles.values}>
          {borders.map((el, index) => {
            return (
              <div
                key={el.leftBorder}
                className={styles.range}
                style={{
                  width: `${
                    (index === 0
                      ? el.rightBorder - el.leftBorder
                      : el.rightBorder - el.leftBorder + 1) / percent
                  }%`,
                  color: el.color,
                }}
              >
                <span>[{el.leftBorder}</span>
                <span>{el.rightBorder}]</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.maxValue}>{value}</div>
    </div>
  );
};

export default ProgressBar;
