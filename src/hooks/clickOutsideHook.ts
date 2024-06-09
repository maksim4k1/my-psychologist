import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<any>,
  callback: Function,
  ignoreRef?: RefObject<any>,
) => {
  const onClickHandler = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      if (
        !ignoreRef ||
        (event.target !== ignoreRef.current &&
          !ignoreRef.current.contains(event.target))
      ) {
        callback();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", onClickHandler);

    return () => {
      window.removeEventListener("mousedown", onClickHandler);
    };
  }, [ref]);
};
