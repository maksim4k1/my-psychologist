export const httpStatuses = {
  ok: {
    status: 200,
    statusText: "OK",
  },
  created: {
    status: 201,
    statusText: "Created",
  },
  accepted: {
    status: 202,
    statusText: "Accepted",
  },
  noContent: {
    status: 204,
    statusText: "No Content",
  },
  badRequest: {
    status: 400,
    statusText: "Bad Request",
  },
  unauthorized: {
    status: 401,
    statusText: "Unauthorized",
  },
  forbidden: {
    status: 403,
    statusText: "Forbidden",
  },
  notFound: {
    status: 404,
    statusText: "Not Found",
  },
  internalServerError: {
    status: 500,
    statusText: "Internal Server Error",
  },
  notImplemented: {
    status: 501,
    statusText: "Not Implemented",
  },
  serviceUnavailable: {
    status: 503,
    statusText: "Service Unavailable",
  },
  gatewayTimeout: {
    status: 504,
    statusText: "Gateway Timeout",
  },
};
