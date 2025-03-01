import statePersist from "@/redux/state-persist";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const INITIAL_STATE: BranchSelectorState = {
    selectedBranch: {
        id: 0,
        name: "all",
        description: "",
        createdAt: new Date(),
        deletedAt: new Date(),
        updatedAt: new Date(),
    },
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

        RESET: (state) => {
            state.selectedBranch = INITIAL_STATE.selectedBranch;
            persistBranchSelectorState(INITIAL_STATE) // Persist reset state
        },
    }
});

export const { CHANGE_BRANCH, RESET } = BranchSelectorSlice.actions;

export const branchSelectorReducer = BranchSelectorSlice.reducer;

export default BranchSelectorSlice;