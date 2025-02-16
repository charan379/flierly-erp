import statePersist from "@/redux/state-persist";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const INITIAL_STATE: BranchSelectorState = {
    selectedBranch: null,
};

const PERSISTING_STATE: BranchSelectorState | null = statePersist.get<BranchSelectorState>('branch') || null;

const persistBranchSelectorState = (state: BranchSelectorState) => {
    statePersist.set('branch', JSON.stringify(state));
};

const BranchSelectorSlice = createSlice({
    name: 'branch',
    initialState: PERSISTING_STATE ?? INITIAL_STATE,
    reducers: {
        CHANGE_BRANCH: (state, action: PayloadAction<Branch>) => {
            state.selectedBranch = action.payload;
            persistBranchSelectorState(state) // Persist to localStorage
        },

        RESET: () => {
            persistBranchSelectorState(INITIAL_STATE) // Persist reset state
            return INITIAL_STATE // Return initial state
        },
    }
});

export const { CHANGE_BRANCH, RESET } = BranchSelectorSlice.actions;

export const branchSelectorReducer = BranchSelectorSlice.reducer;

export default BranchSelectorSlice;