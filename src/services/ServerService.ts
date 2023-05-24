import axios, { AxiosResponse } from 'axios'
import { LocalStorageKeys, ServerResponse } from 'src/models'
import { getLocalStorage } from 'src/utilities'
import { API } from 'src/utilities/constants'

class Auth {
	private token: string | null

	constructor() {
		const employee = getLocalStorage(LocalStorageKeys.EMPLOYEE)
		this.token = employee?.token || null
	}

	public getHeaders() {
		return {
			headers: {
				Authorization: `Bearer ${this.token || ''}`,
			}
		}
	}
}

class Adapter {
	public static extractData<T>(response: AxiosResponse<ServerResponse<T>>): ServerResponse<T> {
		return response.data
	}
}

export class Server {
	private auth: Auth

	constructor() {
		this.auth = new Auth()
	}

	public async get<T>(endPoint: string) {
		return Adapter.extractData(await axios.get<ServerResponse<T>>(API + endPoint, this.auth.getHeaders()))
	}

	public async post<T, R>(endPoint: string, data: T) {
		return Adapter.extractData(await axios.post<ServerResponse<R>>(API + endPoint, data, this.auth.getHeaders()))
	}
}