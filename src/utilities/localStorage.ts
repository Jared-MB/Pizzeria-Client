import { LocalStorageKeys } from 'src/models'

export const setLocalStorage = (key: LocalStorageKeys, value: unknown) => {
	window.localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = (key: LocalStorageKeys) => {
	const value = window.localStorage.getItem(key)
	if (value) {
		return JSON.parse(value)
	}
	return null
}

export const removeLocalStorage = (key: LocalStorageKeys) => {
	window.localStorage.removeItem(key)
}