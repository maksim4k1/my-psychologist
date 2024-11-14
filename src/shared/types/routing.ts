import { type AccessRole } from "../config/access.config";

interface GetLinkConfig<P> {
  params?: P extends never ? undefined : P;
  queryParams?: Record<string, string>;
}

export class Page<P extends Record<string, any> = never> {
  public readonly path: string;
  public readonly access?: AccessRole[];

  constructor(path: string, access?: AccessRole[]) {
    this.path = path;
    this.access = access;
  }

  public getLink = (config?: GetLinkConfig<P>): string => {
    const pathDivider = "/";
    const paramStartSymbol = ":";

    const path = this.path;

    if (!config) return path;

    const { params, queryParams } = config;

    let link: string = path;

    if (params) {
      const pathElements = path.split(pathDivider);

      for (let i = 0; i < pathElements.length; i++) {
        const pathEl = pathElements[i];

        if (pathEl[0] === paramStartSymbol) {
          pathElements[i] = params[pathEl.slice(1)];
        }
      }

      link = pathElements.join(pathDivider);
    }

    if (queryParams) {
      const queryParamsArray: string[] = [];

      for (const queryParam in queryParams) {
        queryParamsArray.push(`${queryParam}=${queryParams[queryParam]}`);
      }

      if (queryParamsArray.length) {
        link += "?" + queryParamsArray.join("&");
      }
    }

    return link;
  };
}

export interface Pages {
  landing: Page;
  login: Page;
  registration: Page;
  successRegistration: Page;
  cabinet: Page;
  application: Page<{ id: string }>;
  client: Page<{ id: string }>;
  exercises: Page;
  exercise: Page<{ id: string }>;
  giveExercise: Page;
  changePassword: Page;
  resetPassword: Page;
  profile: Page;
  psychologist: Page;
  result: Page<{ id: string }>;
  detailResult: Page<{ id: string }>;
  hrSurvey: Page;
  psychologistSurvey: Page;
  articles: Page;
  article: Page<{ id: string }>;
  usersAcitivity: Page;
  usersFeedbacks: Page;
  usersResults: Page;
}

interface Route {
  path: string;
  access?: AccessRole[];
}

export type Routes = Route[];
