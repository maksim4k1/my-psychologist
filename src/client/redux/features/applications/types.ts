import { type StatusState } from "@/client/utils";
import {
  type GetApplicationResponseData,
  type GetApplicationsResponseData,
} from "@/shared/types";

export interface ApplicationsState {
  applications: GetApplicationsResponseData;
  application: GetApplicationResponseData | null;
  getApplicationsState: StatusState;
  getApplicationState: StatusState;
  confirmApplicationState: StatusState;
  sendApplicationState: StatusState;
}
