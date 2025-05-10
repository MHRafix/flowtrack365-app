export interface IExpenseCategory {
	_id: string;
	title: string;
	description: string;
}
export interface IExpenseCategoryListWithPagination {
	nodes: IExpenseCategory[];
}
