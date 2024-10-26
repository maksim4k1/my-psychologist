import { ACCESS, type AccessRole } from "@/shared/config/access.config";

export interface Route {
  path: string;
  access?: AccessRole[];
}

export const routes: Route[] = [
  {
    path: "/",
  },
  {
    path: "/auth/login",
    access: [ACCESS.unauthorized],
  },
  {
    path: "/auth/register",
    access: [ACCESS.unauthorized],
  },
  {
    path: "/auth/register/success",
    access: [ACCESS.client],
  },
  {
    path: "/cabinet",
    access: [ACCESS.psychologist, ACCESS.hr],
  },
  {
    path: "/cabinet/applications/:id",
    access: [ACCESS.psychologist, ACCESS.hr],
  },
  {
    path: "/cabinet/clients/:id",
    access: [ACCESS.psychologist, ACCESS.hr],
  },
  {
    path: "/exercises",
    access: [ACCESS.client, ACCESS.psychologist, ACCESS.hr],
  },
  {
    path: "/exercises/:id",
    access: [ACCESS.client, ACCESS.psychologist, ACCESS.hr],
  },
  {
    path: "/exercises/give",
    access: [ACCESS.psychologist, ACCESS.hr],
  },
  {
    path: "/password/change",
    access: [ACCESS.unauthorized],
  },
  {
    path: "/password/reset",
    access: [ACCESS.unauthorized],
  },
  {
    path: "/profile",
    access: [ACCESS.client, ACCESS.psychologist, ACCESS.hr],
  },
  {
    path: "/psychologist",
    access: [ACCESS.client, ACCESS.psychologist, ACCESS.hr],
  },
  {
    path: "/results/:id",
    access: [ACCESS.client, ACCESS.psychologist, ACCESS.hr],
  },
  {
    path: "/results/detail/:id",
    access: [ACCESS.client, ACCESS.psychologist, ACCESS.hr],
  },
  {
    path: "/survey/hr",
    access: [ACCESS.client],
  },
  {
    path: "/survey/psychologist",
    access: [ACCESS.client],
  },
  {
    path: "/theory",
    access: [ACCESS.client, ACCESS.psychologist, ACCESS.hr],
  },
  {
    path: "/theory/:id",
    access: [ACCESS.client, ACCESS.psychologist, ACCESS.hr],
  },
].toSorted((a, b) => {
  if (a.path > b.path) return -1;
  if (a.path < b.path) return 1;
  return 0;
});
