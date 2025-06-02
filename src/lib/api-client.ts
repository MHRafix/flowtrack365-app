import { StorageUtil } from './storage.util';

export const gqlRequest = async <T>(payload: {
	query: string;
	variables?: { [key: string]: any };
}) => {
	const apiResponse = await fetch(
		`${import.meta.env.VITE_APP_BUSINESS_API_URL}/graphql`,
		{
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${StorageUtil.getItem('token')}`,
			},
			body: JSON.stringify({
				query: payload.query,
				variables: payload.variables,
			}),
		}
	);

	if (!apiResponse.ok) {
		throw new Error('Failed to fetch data');
	}

	const { data, errors } = await apiResponse.json();

	if (errors) {
		throw new Error(errors.map((e: any) => e.message).join(', '));
	}

	return data as T;
};

export const gql = String.raw;

// export const identityApi = axios.create({
// 	baseURL: import.meta.env.VITE_APP_IDENTITY_API_URL,
// 	headers: {
// 		'Content-Type': 'application/json',
// 		Accept: 'application/json',
// 		Authorization: `Bearer ${StorageUtil.getItem('token')}`,
// 	},
// });
