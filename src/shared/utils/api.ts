import { ACCESS, type AccessRole } from "@/shared/config/access";
import { DAILY_TASK_TYPES, pages } from "@/shared/data";
import { type DailyTaskType } from "@/shared/types";

export const getRole = (roleId: number = -1): AccessRole => {
  if (roleId === 1) {
    return ACCESS.client;
  } else if (roleId === 2) {
    return ACCESS.psychologist;
  } else if (roleId === 3) {
    return ACCESS.hr;
  } else if (roleId === 0) {
    return ACCESS.admin;
  }

  return ACCESS.unauthorized;
};

export const getRoleId = (role: AccessRole): -1 | 0 | 1 | 2 | 3 => {
  if (role === ACCESS.client) {
    return 1;
  } else if (role === ACCESS.psychologist) {
    return 2;
  } else if (role === ACCESS.hr) {
    return 3;
  } else if (role === ACCESS.admin) {
    return 0;
  }

  return -1;
};

export const getDailyTaskType = (taskType: number): DailyTaskType => {
  switch (taskType) {
    case 1: {
      return DAILY_TASK_TYPES.theory;
    }
    case 2: {
      return DAILY_TASK_TYPES.moodTracker;
    }
    case 3: {
      return DAILY_TASK_TYPES.test;
    }
    case 4: {
      return DAILY_TASK_TYPES.kptDiary;
    }
  }

  return DAILY_TASK_TYPES.exercise;
};

export const getDailyTaskLink = (
  taskType: DailyTaskType,
  taskId: string,
): string | null => {
  const getLinkConfig = { params: { id: taskId } };

  switch (taskType) {
    case "theory": {
      return pages.article.getLink(getLinkConfig);
    }
    case "test": {
      return pages.exercise.getLink(getLinkConfig);
    }
  }

  return null;
};
