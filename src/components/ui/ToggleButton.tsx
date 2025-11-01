import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { toggleTheme } from '../../redux/slices/themeSlice';
import MoonIcon from '../icons/MoonIcon';
import SunIcon from '../icons/SunIcon';

function ToggleButton() {
   const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode); 
  const checked = theme === "dark";

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <label className="relative w-10 h-10 bg-white dark:bg-gray20 grid place-items-center cursor-pointer rounded-full shadow-[0_0_30px_10px_rgba(0,0,0,0.05)] transition-all duration-300"
      aria-label="Toggle light/dark theme">
      <input type="checkbox" checked={checked} onChange={handleToggle} className="sr-only" aria-checked={checked} />

      <div className={`absolute grid place-items-center transition-transform duration-500 ${
          checked ?  "scale-100 rotate-0" : "scale-0"}`} >
        <MoonIcon className="w-5 h-5 text-gray-800 dark:text-white" />
      </div>

      <div className={`absolute grid place-items-center transition-transform duration-500 ${
          checked ? "scale-0" : "scale-100 rotate-0"  }`} >
        <SunIcon className="w-5 h-5 text-yellow-500" />
      </div>
    </label>
  )
}

export default ToggleButton
