import { UI_RESIZE } from "../actions/types";

const isMobile = () => {
  return Boolean(
    navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
  );
};

const INITIAL_STATE = {
  isMobile: isMobile()
};

export default function userInterface(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UI_RESIZE:
      const isMobile = isMobile();
      return {
        ...state,
        isMobile: isMobile
      };
  }
}
