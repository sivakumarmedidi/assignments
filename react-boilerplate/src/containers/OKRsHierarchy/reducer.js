import initialState from "./initialState";
import flattenOKRs from "../../utils/flattenOKRs";
import * as actions from "./actions";

function reducer(state = initialState, action) {
	switch (action.type) {
		case actions.FETCHED_OKRS:
			const {flattenedData, applicableCategoryFilters} = flattenOKRs(action.data);
			return state.set("isLoadingOKRs", false).set("flattenedOKRs", flattenedData).set("applicableCategoryFilters", applicableCategoryFilters);
		case actions.TOGGLE_PARENT: {
			return state.setIn(["closedParents", action.parentId], !state.closedParents[action.parentId]);
		}
		case actions.SELECT_CATEGORY: {
			return state.set("selectedCategory", action.category);
		}
		case actions.FETCHING_OKRS_FAILED: {
			return state.set("error", action.error).set("isLoadingOKRs", false).set("flattenedOKRs", {}).set("applicableCategoryFilters", []);
		}
		default:
			return initialState;
	}
}

export default reducer;
