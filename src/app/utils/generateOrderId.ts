const getRandomChar = () => {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

	return chars.charAt(Math.floor(Math.random() * chars.length))
}

// Function to generate a random order ID with 5 characters
export const generateOrderId = () => {
	let orderId = ''
	for (let i = 0; i < 5; i++) {
		orderId += getRandomChar()
	}

	return orderId
}
