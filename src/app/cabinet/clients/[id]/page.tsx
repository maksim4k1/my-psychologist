"use client";

import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import Subtitle from "@/components/UI/Titles/Subtitle";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../../config/access.config";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useParams } from "next/navigation";
import {
  selectClient,
  selectClientState,
} from "@/redux/features/clients/selectors";
import ClientsService from "@/api/clients";
import TestCard from "@/components/UI/Cards/TestCard";
import ProfileCard from "@/components/UI/Cards/ProfileCard";
import { selectRole } from "@/redux/features/auth/selectors";
import TestsService from "@/api/tests";
import {
  selectGetTestsByUserIdState,
  selectTestsByUserId,
} from "@/redux/features/tests/selectors";
import { addQueryParams } from "@/utils/urlUtils";
import StateWrapper from "@/components/wrappers/StateWrapper";
import { testsActions } from "@/redux/features/tests";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { clientsActions } from "@/redux/features/clients";

function PsychologistClientPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const client = useAppSelector(selectClient);
  const clientState = useAppSelector(selectClientState);
  const tests = useAppSelector(selectTestsByUserId);
  const testsState = useAppSelector(selectGetTestsByUserIdState);
  const role = useAppSelector(selectRole);

  useEffect(() => {
    dispatch(ClientsService.getClient(id));
    dispatch(TestsService.getTestsByUserId(id));
  }, [dispatch, id]);

  useSetDefaultState(clientsActions.getClientSetDefaultState());
  useSetDefaultState(testsActions.getTestsByUserIdSetDefaultState());

  return (
    <Container>
      <PageTitle className={styles.title}>
        Профиль {role === ACCESS.psychologist ? "клиента" : "сотрудника"}
      </PageTitle>
      <div className={styles.main}>
        <StateWrapper state={[clientState, testsState]}>
          {client && <ProfileCard profile={client} />}
          <div>
            <Subtitle>
              {!!tests.length ? "Пройденные тесты" : "Нет пройденных тестов"}
            </Subtitle>
            {!!tests.length && (
              <div className={styles.tests}>
                {tests.map((el) => {
                  return (
                    <TestCard
                      key={el.id}
                      test={el}
                      params={{ userId: id }}
                    />
                  );
                })}
              </div>
            )}
            <div className={styles.buttons}>
              {/* <PrimaryButton href="./result/overall">
                Общий результат
              </PrimaryButton> */}
              <PrimaryButton
                href={addQueryParams("/exercises/give", {
                  userId: id,
                })}
              >
                Назначить задание
              </PrimaryButton>
            </div>
          </div>
        </StateWrapper>
      </div>
    </Container>
  );
}

export default checkAuth(PsychologistClientPage, true, [
  ACCESS.psychologist,
  ACCESS.hr,
]);
