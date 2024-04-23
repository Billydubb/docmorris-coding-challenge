import { getUser } from 'app/api/getUser'
import { User } from 'app/models/User'
import { makeAutoObservable } from 'mobx'

export class UserStore {
	user!: User

	constructor() {
		makeAutoObservable(this)
		this.fetchUser()
	}

	fetchUser() {
		const response = getUser()
		this.setUser(response)
	}

	setUser(user: User) {
		this.user = user
	}
}
