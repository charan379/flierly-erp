import { AppDispatch, RootState } from "@/redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { CHANGE_BRANCH, RESET } from "../redux/branch-selector.slice";

export default function useBranchSelector() {

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const branch = useTypedSelector((state) => state.branch);

    const dispatch = useDispatch<AppDispatch>();

    return {
        selectedBranch: branch.selectedBranch,
        selectedBranchId: branch.selectedBranch?.id,
        setSelectedBranch: (branch: Branch): void => {
            dispatch(CHANGE_BRANCH(branch))
        },
        resetSelectedBranch: (): void => {
            dispatch(RESET())
        }

    }
}