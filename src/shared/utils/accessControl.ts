import { ACCESS, type AccessRole } from "../config/access";
import { errorPages, pages, routes } from "../data";

const checkPath = (pathname: string, template: string): boolean => {
  const pathDivider = "/";
  const paramIdentifier = ":";

  const pathElements = pathname.split(pathDivider);
  const templateElements = template.split(pathDivider);

  if (pathElements.length !== templateElements.length) return false;

  const pathElRegExp = /[A-Za-z0-9-_.~%]/i;
  const n = pathElements.length;

  for (let i = 0; i < n; i++) {
    const pathEl = pathElements[i];
    const templateEl = templateElements[i];

    if (templateEl[0] === paramIdentifier) {
      if (!pathElRegExp.test(pathEl)) return false;
    } else if (pathEl !== templateEl) return false;
  }

  return true;
};

export const checkAccess = (pathname: string, userRole: AccessRole) => {
  let responsePath: string = errorPages.notFound.path;
  let responseType: "next" | "rewrite" | "redirect" = "rewrite";

  for (const route of routes) {
    const { path, access } = route;

    if (checkPath(pathname, path)) {
      if (!access || access.includes(userRole)) {
        responsePath = pathname;
        responseType = "next";
      } else {
        if (userRole === ACCESS.unauthorized) {
          responsePath = pages.login.path;
          responseType = "redirect";
        } else if (pathname === pages.registration.path) {
          responsePath = pages.successRegistration.path;
          responseType = "redirect";
        } else if (
          pathname === pages.hrSurvey.path ||
          pathname === pages.psychologistSurvey.path
        ) {
          responsePath = pages.cabinet.path;
          responseType = "redirect";
        } else if (access.length === 1 && access[0] === ACCESS.admin) {
          responsePath = errorPages.notFound.path;
          responseType = "rewrite";
        } else if (access.length === 1 && access[0] === ACCESS.unauthorized) {
          responsePath = pages.profile.path;
          responseType = "redirect";
        } else {
          responsePath = errorPages.accessDenied.path;
          responseType = "rewrite";
        }
      }
      break;
    }
  }

  return {
    path: responsePath,
    operationType: responseType,
  };
};
