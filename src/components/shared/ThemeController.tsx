import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";


function ThemeController({ children }: { children: React.ReactNode }) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);



  return <>{children}</>;
}

export default ThemeController;
