import { Product } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ProductFormStateType } from '../components/all-products/ProductForm';
import {
	Create_Product_Mutation,
	Remove_Product_Mutation,
	Update_Product_Mutation,
	Update_Product_Stock_Mutation,
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

	// update product
	const updateProduct = useMutation({
		mutationKey: [`update-product`],
		mutationFn: async (payload: UpdatePayloadType) =>
			await gqlRequest({
				query: Update_Product_Mutation,
				variables: payload,
			}),

		onSuccess: () => {
			toast.success('Product has been updated successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to update product.');
		},
	});

	// update stock
	const updateStock = useMutation({
		mutationKey: [`update-product-stock`],
		mutationFn: async (payload: UpdateStockPayloadType) =>
			await gqlRequest({
				query: Update_Product_Stock_Mutation,
				variables: payload,
			}),

		onSuccess: () => {
			toast.success('Stock has been updated successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to update stock.');
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
		updateProduct,
		updateStock,
		removeProduct,
	};
};

interface CreatePayloadType extends ProductFormStateType {
	orgUID: string;
}

export interface UpdatePayloadType {
	payload: Product;
	orgUid: string;
}

export interface UpdateStockPayloadType {
	payload: {
		quantity: number;
		stockPrice: number;
		stockType: string;
		updatedBy: string;
		date: Date;
	};
	orgUid: string;
	id: string;
}
