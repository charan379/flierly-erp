import { useDispatch, useSelector } from "react-redux";
import { RESET, CHANGE_LANGUAGE } from './actions';
import getTranslation from "@/utils/getTranslation";

export default function useLocale() {
  // 
  const locale = useSelector((state) => state.locale);
  // 
  const dispatch = useDispatch();
  // 
  return {
    locale,
    translate: (value) => getTranslation(locale.result, value),
    resetLocale: () => dispatch(RESET()),
    changeLanguage: (langCode) => dispatch(CHANGE_LANGUAGE(langCode)),
  };
}
