import React from "react";
import "./index.scss";

const OKRTree = ({parentId, flattenedData, closedParents, selectedCategory, onClick, toggle}) => {
	const data = flattenedData[parentId].data;
	const hasChildren = flattenedData[parentId] && flattenedData[parentId].children && flattenedData[parentId].children.length;
	const isClosed = closedParents[parentId];
	return !selectedCategory || (selectedCategory && data.category === selectedCategory) ? <div>
		<div className="parent">
			{hasChildren ? <span className={"caret"} onClick={() => toggle(parentId)}>{isClosed ? ">" : "v"}</span> : null}
			<span onClick={() => onClick(parentId)}>{data.title}</span>
			{
				hasChildren && !isClosed ?
					<div className="child-container">
						{flattenedData[parentId].children.map(childId =>
						<div key={childId} className="child">
							<OKRTree parentId={childId}
							         flattenedData={flattenedData}
							         closedParents={closedParents}
							         onClick={onClick}
							         toggle={toggle}
							/>
						</div>)}
					</div> : null
			}
		</div>
	</div> : null
};

export default OKRTree;
