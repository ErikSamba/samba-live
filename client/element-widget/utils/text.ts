export const capitalize = (s: string): string => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
}

export const renderAttributeName = (attribute: string): string => {
	switch (attribute) {
		case 'href':
			return 'Link'
		case 'src':
			return 'Image Link'
		default:
			return capitalize(attribute)
	}
}

export const truncateSelector = (selector: string, selectorTruncate: number = 45): string => {
	return selector.length > selectorTruncate ? `${selector.substring(0, selectorTruncate)}...` : selector
}