export interface IQueryParams {
	page: number;
	per: number;
}

export interface IPaginationConfig {
	total: number;
	current: number;
	pageSize: number;
}

export interface ITableListItem {
	id: number;
	name: string;
	desc: string;
	href: string;
	type: string;
}

export interface ITableData {
	loading: boolean;
	list: ITableListItem[];
	pagination: IPaginationConfig;
}

export interface createdData {
	userName: string;
	password: string;
	name: string;
	sex: number;
	passwordTo: string;
	region: string[];
}

export interface createdFinishData {
	userName: string;
	password: string;
	name: string;
	sex: number;
	region: string;
}

export interface editData {
	name: string;
	sex: number;
	region: string[];
}

export interface editFinishData {
	userName: string;
	sex: number;
	region: string;
}
