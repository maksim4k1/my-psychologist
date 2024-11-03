export const getCookie = (cookieName: string): string | null => {
  if (global?.document?.cookie) {
    const cookies: string[] = document.cookie.split("; ");

    const findedCookie: string | undefined = cookies.find(
      (el) => el.split("=")[0] === cookieName,
    );

    return findedCookie ? findedCookie.split("=")[1] : null;
  }
  return null;
};
