import { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface Props {
  value: number;
  maxGood: number;
  maxAverage: number;
  maxBad: number;
  isReversed?: boolean;
  className?: string;
}

const ProgressBar: FunctionComponent<Props> = ({
  value,
  maxGood,
  maxAverage,
  maxBad,
  isReversed = false,
  className = "",
}) => {
  const percent = (isReversed ? maxGood : maxBad) / 100;
  const valuePercent = value / percent;
  const firstPercent = (isReversed ? maxBad : maxGood) / percent;
  const middlePercent =
    (isReversed ? maxAverage - maxBad : maxAverage - maxGood) / percent;
  const lastPercent =
    (isReversed ? maxGood - maxAverage : maxBad - maxAverage) / percent;

  const color = isReversed
    ? value <= maxBad
      ? styles.bad
      : value <= maxAverage
      ? styles.average
      : styles.good
    : value <= maxGood
    ? styles.good
    : value <= maxAverage
    ? styles.average
    : styles.bad;

  return (
    <div className={`${styles.contatiner} ${className}`}>
      <div className={styles.progressBar}>
        <div className={styles.progressLine}>
          <div
            className={`${styles.progress} ${color}`}
            style={{ width: `${valuePercent}%` }}
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
          <div
            className={`${styles.range} ${
              isReversed ? styles.bad : styles.good
            }`}
            style={{ width: `${firstPercent}%` }}
          >
            <span>[0</span>
            <span>{isReversed ? maxBad : maxGood}]</span>
          </div>
          <div
            className={`${styles.range} ${styles.average}`}
            style={{ width: `${middlePercent}%` }}
          >
            <span>[{isReversed ? maxBad + 1 : maxGood + 1}</span>
            <span>{maxAverage}]</span>
          </div>
          <div
            className={`${styles.range} ${
              isReversed ? styles.good : styles.bad
            }`}
            style={{ width: `${lastPercent}%` }}
          >
            <span>[{maxAverage + 1}</span>
            <span>{isReversed ? maxGood : maxBad}]</span>
          </div>
        </div>
      </div>
      <div className={styles.maxValue}>{value}</div>
    </div>
  );
};

export default ProgressBar;
