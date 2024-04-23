import { User } from '../models/User'

export const getUser = (): User => {
	return require('../lib/user.json')
}
