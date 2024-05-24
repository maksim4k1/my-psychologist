"use client";

import styles from "./styles.module.scss";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../../../config/access.config";
import RadarChart from "@/components/UI/Charts/RadarChart";

function PsychologistClientsOverallResultPage() {
  const data = [
    {
      subject: "Эмоциональное истощение",
      A: 15,
      fullMark: 54,
    },
    {
      subject: "Редукция проф. достижений",
      A: 35,
      fullMark: 40,
    },
    {
      subject: "Деперсонализация",
      A: 25,
      fullMark: 30,
    },
  ];

  return (
    <Container>
      <PageTitle className={styles.title}>История тестов</PageTitle>
      <RadarChart
        data={data}
        className={styles.radarChart}
      />
      <div className={styles.descriptionTestContainer}>
        <div className={styles.descriptionTextContainer}>
          <h3 className={styles.descriptionTitle}>
            Эмоциональное истощение — 15
          </h3>
          <p className={styles.descriptionText}>
            Эмоциональное истощение рассматривается как основная составляющая
            выгорания и проявляется в переживаниях сниженного эмоционального
            тонуса, повышенной психической истощаемости и аффективной
            лабильности, утраты интереса и позитивных чувств к окружающим,
            ощущении «пресыщенности» работой, неудовлетворенностью жизнью в
            целом.
          </p>
        </div>

        <div className={styles.descriptionTextContainer}>
          <h3 className={styles.descriptionTitle}>Деперсонализация — 25</h3>
          <p className={styles.descriptionText}>
            Деперсонализация проявляется в эмоциональном отстранении и
            безразличии, формальном выполнении профессиональных обязанностей без
            личностной включенности и сопереживания, а в отдельных случаях – в
            негативизме и циничном отношении. В контексте синдрома перегорания
            «деперсонализация» предполагает формирование особых, деструктивных
            взаимоотношений с окружающими людьми.
          </p>
        </div>

        <div className={styles.descriptionTextContainer}>
          <h3 className={styles.descriptionTitle}>
            Редукция профессиональных достижений — 24
          </h3>
          <p className={styles.descriptionText}>
            Редукция профессиональных достижений отражает степень
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

export default checkAuth(PsychologistClientsOverallResultPage, true, [
  ACCESS.psychologist,
]);
