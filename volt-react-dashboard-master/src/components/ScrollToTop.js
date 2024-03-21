// Here are more informations about the scroll restoration of React Router
// https://reactrouter.com/web/guides/scroll-restoration

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default () => {
  /* useLocation(): get the information of the current URL path  */
  const { pathname } = useLocation();

  /* Only scroll the windown whenver the pathname - URL path change */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};
