export const filterQuery = ({
	offset,
	limit,
	orderBy,
	orderType,
	idCategory,
	idCountry,
	state,
	location,
}) => {
	let queryString = ''

	if (offset && limit) {
		queryString += `&offset=${offset}&limit=${limit}`
	}
	if (orderBy && orderType) {
		queryString += `&orderBy=${orderBy}&orderType=${orderType}`
	}
	if (idCategory) {
		queryString += `&idCategory=${idCategory}`
	}
	if (idCountry) {
		queryString += `&idCountry=${idCountry}`
		if (state) {
			queryString += `&state=${state}`
			if (location) {
				queryString += `&location=${location}`
			}
		}
	}
	return queryString
}
