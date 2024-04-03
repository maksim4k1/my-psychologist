import { publicRoutes } from "./publicRoutes";
import { unauthorizedRoutes } from "./unauthorizedRoutes";
import { authorizedRoutes } from "./authorizedRoutes";
import { psychologistRoutes } from "./psychologistRoutes";
import { clientRoutes } from "./clientRoutes";
import { Roles } from "@/configs/routesConfig";

interface Route {
  reg: RegExp;
  role: string;
}

const mapStringToRoute =
  (role: string) =>
  (reg: RegExp): Route => {
    return { reg, role };
  };

const routes: Route[] = [
  ...publicRoutes.map(mapStringToRoute(Roles.public)),
  ...unauthorizedRoutes.map(mapStringToRoute(Roles.unauthorized)),
  ...authorizedRoutes.map(mapStringToRoute(Roles.authorized)),
  ...psychologistRoutes.map(mapStringToRoute(Roles.psychologist)),
  ...clientRoutes.map(mapStringToRoute(Roles.client)),
];

export function checkAccessRights(
  pathname: string,
  role: string,
): string | null {
  for (let route of routes) {
    let res = pathname.match(route.reg);

    if (res !== null && res[0] === pathname) {
      if (route.role === role || route.role === Roles.public) return null;
      else if (role === Roles.unauthorized) return "/auth/login";
      else if (route.role === Roles.psychologist) return "/psychologist/survey";
      else return "/error/403";
    }
  }

  return "/error/404";
}
