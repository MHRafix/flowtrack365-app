type TKey = 'token' | 'orgUID';

export class StorageUtil {
	static getItem(key: TKey) {
		return localStorage.getItem(key);
	}

	static setItem(key: TKey, value: string) {
		localStorage.setItem(key, value);
	}

	static removeItem(key: TKey) {
		localStorage.removeItem(key);
	}
}
