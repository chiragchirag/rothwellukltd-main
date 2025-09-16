import { useEffect } from "react";
import isEmpty from "../Utils/isEmpty/isEmpty";

export const useDebounce = (value, callback) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (callback && !isEmpty(value)) {
        callback(value);
      }
    }, 600);
    return () => clearTimeout(timerId);
  }, [value]);
};
