import { Meta } from './commonModelTypes';

export interface IExpenseCategory {
	_id: string;
	title: string;
	description: string;
	createdAt: string;
}
export interface IExpenseCategoryListWithPagination {
	nodes: IExpenseCategory[];
	meta: Meta;
}
