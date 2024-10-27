import { ACCESS } from "@/shared/config/access.config";
import { Page, type Pages, type Routes } from "@/shared/types";

export const pages: Pages = {
  landing: new Page("/"),
  login: new Page("/auth/login", [ACCESS.unauthorized]),
  registration: new Page("/auth/registration", [ACCESS.unauthorized]),
  successRegistration: new Page("/auth/registration/success", [ACCESS.client]),
  cabinet: new Page("/cabinet", [ACCESS.psychologist, ACCESS.hr]),
  application: new Page<{ id: string }>("/cabinet/applications/:id", [
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  client: new Page<{ id: string }>("/cabinet/clients/:id", [
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  exercises: new Page("/exercises", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  exercise: new Page<{ id: string }>("/exercises/:id", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  giveExercise: new Page("/exercises/give", [ACCESS.psychologist, ACCESS.hr]),
  changePassword: new Page("/password/change", [ACCESS.unauthorized]),
  resetPassword: new Page("/password/reset", [ACCESS.unauthorized]),
  profile: new Page("/profile", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  psychologist: new Page("/psychologists", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  result: new Page<{ id: string }>("/results/:id", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  detailResult: new Page<{ id: string }>("/results/detail/:id", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  hrSurvey: new Page("/survey/hr", [ACCESS.client]),
  psychologistSurvey: new Page("/survey/psychologist", [ACCESS.client]),
  articles: new Page("/articles", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  article: new Page<{ id: string }>("/articles/:id", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
};

export const routes: Routes = Array.from(Object.values(pages)).toSorted(
  (a, b) => {
    if (a.path > b.path) return -1;
    if (a.path < b.path) return 1;
    return 0;
  },
);
