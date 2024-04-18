"use client";

import styles from "./styles.module.scss";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../../config/access.config";

function PsychologistClientsResultPage() {
  return (
    <Container>
      <PageTitle className={styles.title}>Результаты теста</PageTitle>
      <div className={styles.resultTestContainer}>
        <div className={styles.resultTextContainer}>
          <h2 className={styles.resultTitle}>
            Эмоциональное истощение — 15 (норма)
          </h2>
          <p className={styles.resultText}>
            Эмоциональное истощение рассматривается как основная составляющая
            выгорания и проявляется в переживаниях сниженного эмоционального
            тонуса, повышенной психической истощаемости и аффективной
            лабильности, утраты интереса и позитивных чувств к окружающим,
            ощущении «пресыщенности» работой, неудовлетворенностью жизнью в
            целом.
          </p>
        </div>

        <div className={styles.resultTextContainer}>
          <h2 className={styles.resultTitle}>
            Деперсонализация — 25 (чуть выше нормы)
          </h2>
          <p className={styles.resultText}>
            Деперсонализация проявляется в эмоциональном отстранении и
            безразличии, формальном выполнении профессиональных обязанностей без
            личностной включенности и сопереживания, а в отдельных случаях – в
            негативизме и циничном отношении. В контексте синдрома перегорания
            «деперсонализация» предполагает формирование особых, деструктивных
            взаимоотношений с окружающими людьми.
          </p>
        </div>

        <div className={styles.resultTextContainer}>
          <h2 className={styles.resultTitle}>
            Редукция профессиональных достижений — 24 (сильно ниже нормы??)
          </h2>
          <p className={styles.resultText}>
            Редукция профессиональных достижений отражает степень
            удовлетворенности человека собой как личностью и как профессионалом.
            Неудовлетворительное значение этого показателя отражает тенденцию к
            негативной оценке своей компетентности и продуктивности и, как
            следствие, – снижение профессиональной мотивации, нарастание
            негативизма в отношении служебных обязанностей, тенденция к снятию с
            себя ответственности, к изоляции от окружающих, отстраненности и
            неучастия, избегания работы сначала психологически, а затем
            физически.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default checkAuth(PsychologistClientsResultPage, true, [
  ACCESS.psychologist,
]);
