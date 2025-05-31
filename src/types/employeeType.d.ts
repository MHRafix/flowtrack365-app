import { IOrganization } from './organizationType';
import { User } from './userType';

export interface IEmployee {
	_id: string;
	employeeDetails: User;
	organizations: EmployeeOrganization[];
}

export interface EmployeeOrganization {
	organization: IOrganization;
	salary: number;
	role: string;
}
