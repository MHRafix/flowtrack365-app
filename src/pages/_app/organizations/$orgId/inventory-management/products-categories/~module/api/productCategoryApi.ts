import { ProductCategory } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CategoryFormStateType } from '../components/CategoryForm';
import {
	Create_Product_Category_Mutation,
	Remove_Product_Category_Mutation,
	Update_Product_Category_Mutation,
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

	// update product
	const updateProductCategory = useMutation({
		mutationKey: [`update-product-category`],
		mutationFn: async (payload: ProductCategory) =>
			await gqlRequest({
				query: Update_Product_Category_Mutation,
				variables: {
					payload,
				},
			}),

		onSuccess: () => {
			toast.success('Category has been updated successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to update category.');
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
		updateProductCategory,
		removeProductCategory,
	};
};

interface CreatePayloadType extends CategoryFormStateType {
	orgUID: string;
}
