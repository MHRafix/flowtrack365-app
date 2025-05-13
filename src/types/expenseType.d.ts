import { IExpenseCategory } from './expenseCategoriesType';

export interface IExpense {
	_id: string;
	title: string;
	description: string;
	amount: number;
	category: IExpenseCategory;
	createdAt: string;
}
export interface IExpenseListWithPagination {
	nodes: IExpense[];
}
