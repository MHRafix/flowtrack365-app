import { Brand, Unit } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
	Create_Unit_Mutation,
	Remove_Unit_Mutation,
	Update_Unit_Mutation,
} from '../gql-query/query.gql';

export const unitApi = (onSuccess?: CallableFunction) => {
	// create unit
	const createUnit = useMutation({
		mutationKey: [`create-unit`],
		mutationFn: async (payload: Unit) =>
			await gqlRequest({
				query: Create_Unit_Mutation,
				variables: {
					payload,
				},
			}),

		onSuccess: () => {
			toast.success('Unit has been created successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to create unit.');
		},
	});

	// update unit
	const updateUnit = useMutation({
		mutationKey: [`update-unit`],
		mutationFn: async (payload: Brand) =>
			await gqlRequest({
				query: Update_Unit_Mutation,
				variables: {
					payload,
					orgUid: payload?.orgUID,
				},
			}),

		onSuccess: () => {
			toast.success('Unit has been updated successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to update unit.');
		},
	});

	// remove unit
	const removeUnit = useMutation({
		mutationKey: [`remove-unit`],
		mutationFn: async ({ id, orgUid }: { id: string; orgUid: string }) =>
			await gqlRequest({
				query: Remove_Unit_Mutation,
				variables: {
					id,
					orgUid,
				},
			}),

		onSuccess: () => {
			toast.success('Unit has been removed successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to remove unit.');
		},
	});

	return {
		createUnit,
		updateUnit,
		removeUnit,
	};
};
