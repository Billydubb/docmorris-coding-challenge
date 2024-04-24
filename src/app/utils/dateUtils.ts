export const getXDaysAgo = (daysAgo: number) => {
	const today = new Date()
	// Set the date to yesterday
	const yesterday = new Date(today) // Create a copy of the current date
	yesterday.setDate(today.getDate() - daysAgo) //
	return yesterday
}

export const formatDate = (date: Date) => {
	const locale = 'de-DE' // German locale
	const options = {
		day: 'numeric',
		month: 'long', // Full month name
		year: 'numeric'
	}

	// @ts-ignore
	const formatter = new Intl.DateTimeFormat(locale, options)

	// Format the date
	const formattedDate = formatter.format(date)

	return formattedDate
}
