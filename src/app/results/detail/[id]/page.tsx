"use client";

import styles from "./styles.module.scss";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../../config/access.config";
import Subtitle from "@/components/UI/Titles/Subtitle";
import ProgressBar from "@/components/UI/Charts/ProgressBar";
import HttpErrorWrapper from "@/components/wrappers/HttpErrorWrapper";
import { useSearchParams } from "next/navigation";
import { checkQueryParams } from "@/utils/urlUtils";

function PsychologistClientsResultPage() {
  const searchParams = useSearchParams();

  return (
    <HttpErrorWrapper
      status={checkQueryParams(searchParams, true, "date", "userId")}
      error={[
        { status: 400, message: "" },
        { status: 400, message: "" },
      ]}
    >
      <Container>
        <PageTitle className={styles.title}>Результаты теста</PageTitle>
        <Subtitle className={styles.subtitle}>
          Профессиональное выгорание
        </Subtitle>
        <div className={styles.results}>
          <div className={styles.result}>
            <h4 className={styles.resultTitle}>Эмоциональное истощение</h4>
            <ProgressBar
              className={styles.scale}
              value={15}
              maxGood={15}
              maxAverage={24}
              maxBad={54}
            />
          </div>
          <div className={styles.result}>
            <h4 className={styles.resultTitle}>Деперсонализация</h4>
            <ProgressBar
              className={styles.scale}
              value={25}
              maxGood={5}
              maxAverage={10}
              maxBad={30}
            />
          </div>
          <div className={styles.result}>
            <h4 className={styles.resultTitle}>Редукция проф. достижений</h4>
            <ProgressBar
              className={styles.scale}
              value={35}
              maxBad={30}
              maxAverage={36}
              maxGood={40}
              isReversed={true}
            />
          </div>
        </div>
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
              безразличии, формальном выполнении профессиональных обязанностей
              без личностной включенности и сопереживания, а в отдельных случаях
              – в негативизме и циничном отношении. В контексте синдрома
              перегорания «деперсонализация» предполагает формирование особых,
              деструктивных взаимоотношений с окружающими людьми.
            </p>
          </div>

          <div className={styles.descriptionTextContainer}>
            <h3 className={styles.descriptionTitle}>
              Редукция профессиональных достижений — 24
            </h3>
            <p className={styles.descriptionText}>
              Редукция профессиональных достижений отражает степень
              удовлетворенности человека собой как личностью и как
              профессионалом. Неудовлетворительное значение этого показателя
              отражает тенденцию к негативной оценке своей компетентности и
              продуктивности и, как следствие, – снижение профессиональной
              мотивации, нарастание негативизма в отношении служебных
              обязанностей, тенденция к снятию с себя ответственности, к
              изоляции от окружающих, отстраненности и неучастия, избегания
              работы сначала психологически, а затем физически.
            </p>
          </div>
        </div>
      </Container>
    </HttpErrorWrapper>
  );
}

export default checkAuth(PsychologistClientsResultPage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
]);
