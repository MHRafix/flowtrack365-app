export interface IDecodedToken {
	sub: string;
	name: string;
	email: string;
	email_verified: boolean;
	roles: string[];
	permissioms: string[];
	meta: Meta;
	logins_count: number;
	iat: number;
	exp: number;
	aud: string;
	iss: string;
}
export interface Meta {
	'meta:userId': string;
}

export interface IMeUser {
	_id: string;
	name: string;
	email: string;
	email_verified: boolean;
	status: string;
	roles: any[];
	permissions: any[];
	logins_count: number;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	last_login: Date;
}
export type ServerFileReference = {
	__typename?: 'ServerFileReference';
	bucket?: string;
	externalUrl?: string;
	key?: string;
	region?: string;
};

export enum DIRECTORY_NAME {
	rider_avatar = 'rider_avatar',
	unlistedFiles = 'unlistedFiles',
}

export interface IStorageUploadResponse {
	key: string;
	bucket: string;
	region: string;
	url: string;
}
