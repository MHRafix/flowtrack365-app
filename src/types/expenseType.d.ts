export interface IExpense {
	_id: string;
	title: string;
	description: string;
	amount: number;
	category: Category;
}
export interface IExpenseListWithPagination {
	nodes: IExpense[];
}

export interface IExpenseCategory {
	_id: string;
	title: string;
	description: string;
}
