import { useDispatch, useSelector } from "react-redux";

export default function useLocale() {
  const locale = useSelector((state) => state.locale);
  const dispatch = useDispatch();

  return {
    locale,
  };
}
