import { Meta, ServerFileReference } from './commonModelTypes';

export interface IOrganization {
	_id: string;
	name: string;
	tagline: string;
	orgUID: string;
	businessEmail: string;
	businessPhone: string;
	address: string;
	cover: ServerFileReference;
	Logo: ServerFileReference;
	owner: null;
	employees: null;
	createdAt: string;
	updatedAt: string;
}
export interface IOrganizationsWithPagination {
	nodes: IOrganization[];
	meta: Meta;
}
