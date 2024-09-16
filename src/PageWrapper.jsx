import { useState } from "react";
import { useSelector } from "react-redux";
import useUpdateEffect from "./hooks/useUpdateEffect";

const PageWrapper = ({ children, label }) => {
  const [isShowingPage, setIsShowingPage] = useState(false);

  const { focusedPlanet } = useSelector((state) => state.orbit);

  useUpdateEffect(() => {
    if (focusedPlanet?.object.userData.label === label) setIsShowingPage(true);
    else setTimeout(() => setIsShowingPage(false), 1000);
  }, [focusedPlanet]);

  return isShowingPage && children;
};

export default PageWrapper;
