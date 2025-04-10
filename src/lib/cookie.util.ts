export class CookieUtil {
	static set(key: string, value: string, days?: number): void {
		let expires = '';
		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = '; expires=' + date.toUTCString();
		}
		document.cookie = `${key}=${encodeURIComponent(value)}${expires}; path=/`;
	}

	static get(key: string, defaultValue: string = ''): string {
		const cookies = document.cookie.split('; ');
		for (const cookie of cookies) {
			const [cookieKey, cookieValue] = cookie.split('=');
			if (cookieKey === key) {
				return decodeURIComponent(cookieValue);
			}
		}
		return defaultValue;
	}
}
