import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ProductFormStateType } from '../components/ProductForm';
import {
	Create_Product_Mutation,
	Remove_Product_Mutation,
} from '../gql-query/query.gql';

export const productApi = (onSuccess?: CallableFunction) => {
	// create product
	const createProduct = useMutation({
		mutationKey: [`create-product`],
		mutationFn: async (payload: CreatePayloadType) =>
			await gqlRequest({
				query: Create_Product_Mutation,
				variables: {
					payload,
				},
			}),

		onSuccess: () => {
			toast.success('Product created successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to  create product.');
		},
	});
	// remove product
	const removeProduct = useMutation({
		mutationKey: [`remove-product`],
		mutationFn: async (payload: string) =>
			await gqlRequest({
				query: Remove_Product_Mutation,
				variables: {
					id: payload,
				},
			}),

		onSuccess: () => {
			toast.success('Product has been removed successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to remove product.');
		},
	});

	return {
		createProduct,
		updateProduct: createProduct,
		removeProduct,
	};
};

interface CreatePayloadType extends ProductFormStateType {
	orgUID: string;
}
