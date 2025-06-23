import { Brand } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
	Create_Brand_Mutation,
	Remove_Brand_Mutation,
	Update_Brand_Mutation,
} from '../gql-query/query.gql';

export const brandApi = (onSuccess?: CallableFunction) => {
	// create product
	const createBrand = useMutation({
		mutationKey: [`create-brand`],
		mutationFn: async (payload: Brand) =>
			await gqlRequest({
				query: Create_Brand_Mutation,
				variables: {
					payload,
				},
			}),

		onSuccess: () => {
			toast.success('Brand has been created successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to create brand.');
		},
	});

	// update brand
	const updateBrand = useMutation({
		mutationKey: [`update-brand`],
		mutationFn: async (payload: Brand) =>
			await gqlRequest({
				query: Update_Brand_Mutation,
				variables: {
					payload,
					orgUid: payload?.orgUID,
				},
			}),

		onSuccess: () => {
			toast.success('Brand has been updated successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to update brand.');
		},
	});

	// remove brand
	const removeBrand = useMutation({
		mutationKey: [`remove-brand`],
		mutationFn: async ({ id, orgUid }: { id: string; orgUid: string }) =>
			await gqlRequest({
				query: Remove_Brand_Mutation,
				variables: {
					id,
					orgUid,
				},
			}),

		onSuccess: () => {
			toast.success('Brand has been removed successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to remove brand.');
		},
	});

	return {
		createBrand,
		updateBrand,
		removeBrand,
	};
};
