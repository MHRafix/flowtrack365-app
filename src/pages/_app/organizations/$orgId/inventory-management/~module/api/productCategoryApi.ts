import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CategoryFormStateType } from '../components/CategoryForm';
import {
	Create_Product_Category_Mutation,
	Remove_Product_Category_Mutation,
} from '../gql-query/query.gql';

export const productCategoryApi = (onSuccess?: CallableFunction) => {
	// create product
	const createProductCategory = useMutation({
		mutationKey: [`create-product-category`],
		mutationFn: async (payload: CreatePayloadType) =>
			await gqlRequest({
				query: Create_Product_Category_Mutation,
				variables: {
					payload,
				},
			}),

		onSuccess: () => {
			toast.success('Category created successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to  create category.');
		},
	});
	// remove product
	const removeProductCategory = useMutation({
		mutationKey: [`remove-product-category`],
		mutationFn: async (payload: string) =>
			await gqlRequest({
				query: Remove_Product_Category_Mutation,
				variables: {
					id: payload,
				},
			}),

		onSuccess: () => {
			toast.success('Category has been removed successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to remove category.');
		},
	});

	return {
		createProductCategory,
		removeProductCategory,
	};
};

interface CreatePayloadType extends CategoryFormStateType {
	orgUID: string;
}
