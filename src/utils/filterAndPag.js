export const retunrOffsetAndLimit = (offset, limit) => {
	return `offset=${offset}&limit=${limit}`
}

export const returnCategoriesQuery = (id) => {
	return `idCategory=${id}`
}

export const returnOrderQuery = (by, type) => {
	return `orderBy=${by}&orderType=${type}`
}
