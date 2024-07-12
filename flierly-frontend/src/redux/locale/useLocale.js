import { useDispatch, useSelector } from "react-redux";
import { RESET, CHANGE_LANGUAGE } from './actions';

export default function useLocale() {
  const locale = useSelector((state) => state.locale);
  const dispatch = useDispatch();

  return {
    locale,
    resetLocale: () => dispatch(RESET()),
    changeLanguage: (value) => dispatch(CHANGE_LANGUAGE(value)),
  };
}
