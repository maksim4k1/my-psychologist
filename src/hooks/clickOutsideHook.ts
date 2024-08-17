import { usePathname } from "next/navigation";
import { RefObject, useCallback, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<any>,
  closeCallback: Function,
  ignoreRef?: RefObject<any>,
) => {
  const pathname = usePathname();
  const onClickHandler = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (
          !ignoreRef ||
          (event.target !== ignoreRef.current &&
            !ignoreRef.current.contains(event.target))
        ) {
          closeCallback();
        }
      }
    },
    [ref, ignoreRef, closeCallback],
  );

  useEffect(() => {
    window.addEventListener("mousedown", onClickHandler);

    return () => {
      window.removeEventListener("mousedown", onClickHandler);
    };
  }, [ref, onClickHandler]);

  useEffect(() => {
    closeCallback();
  }, [pathname]);
};
