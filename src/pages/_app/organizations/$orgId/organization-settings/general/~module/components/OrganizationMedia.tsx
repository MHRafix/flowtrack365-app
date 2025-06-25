import { Organization } from '@/gql/graphql';
import { UseMutationResult } from '@tanstack/react-query';
import { FC } from 'react';

interface OrganizationMediaProps {
	organization: Organization;
	updateOrganization: UseMutationResult;
}

const OrganizationMedia: FC<OrganizationMediaProps> = () => {
	return <div>OrganizationMedia</div>;
};

export default OrganizationMedia;
