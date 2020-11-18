
const flattenOKRs = okrArray => {
	const flattenedData = {};
	const applicableCategoryFilters = {};
	okrArray.forEach(okr => {
		applicableCategoryFilters[okr.category] = 1;

		if(!flattenedData[okr.id]) {
			flattenedData[okr.id] = {
				data: okr,
				children: []
			};
		} else {
			flattenedData[okr.id].data = okr;
		}

		if(okr.parent_objective_id) {
			if(flattenedData[okr.parent_objective_id]) {
				flattenedData[okr.parent_objective_id].children.push(okr.id);
			} else {
				flattenedData[okr.parent_objective_id] = {
					children: [okr.id]
				};
			}
		} else {
			flattenedData[okr.id].isParent = true;
		}
	});

	return {flattenedData, applicableCategoryFilters: Object.keys(applicableCategoryFilters)};
};

export default flattenOKRs;
