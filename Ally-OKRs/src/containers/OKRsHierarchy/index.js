import React, {useReducer, useEffect} from "react";
import "./index.scss";
import initialState from "./initialState";
import {FETCHED_OKRS, SELECT_CATEGORY, TOGGLE_PARENT, FETCHING_OKRS_FAILED} from "./actions";
import reducer from "./reducer";
import OKRTree from "../../Components/OKRTree";

const OKRHierarchy = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch("https://okrcentral.github.io/sample-okrs/db.json")
			.then(res => res.json())
			.then(data => {
				dispatch({ type: FETCHED_OKRS, data: data.data });
			})
			.catch(e => {
				console.log(e);
				dispatch({ type: FETCHING_OKRS_FAILED, error: e.message });
			})
		;
	}, [])

	return <div className="container">
		{
			state.error ? <div className="error">
					Error Occurred: {state.error}
				</div> :
				state.isLoadingOKRs ? <span>Loading...</span> :
					<div className="OKRsList">
						<div className="category-filter">
							<label>Select Category</label>
							<select className="form-control" value={state.selectedCategory}
							        onChange={e => dispatch({type: SELECT_CATEGORY, category: e.currentTarget.value})}>
								<option value="">None</option>
								{
									state.applicableCategoryFilters.map(category => <option value={category}>{category}</option>)
								}
							</select>
						</div>
						{
							Object.values(state.flattenedOKRs)
								.filter(okr => okr.data && okr.children && okr.children.length)
								.map(okr => <OKRTree
									key={okr.data.id}
									parentId={okr.data.id}
									closedParents={state.closedParents}
									flattenedData={state.flattenedOKRs}
									toggle={parentId => dispatch({type: "TOGGLE_PARENT", parentId: parentId})}
									selectedCategory={state.selectedCategory}
								/>)
						}
					</div>
		}
	</div>
};

export default OKRHierarchy;
