import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ProductFormStateType } from '../components/ProductForm';
import { Create_Product_Mutation } from '../gql-query/query.gql';

export const productApi = (onSuccess?: CallableFunction) => {
	// create product
	const createProduct = useMutation({
		mutationKey: [`create-product`],
		mutationFn: async (payload: CreatePayloadType) =>
			await gqlRequest({
				query: Create_Product_Mutation,
				variables: {
					input: payload,
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

	return {
		createProduct,
		updateProduct: createProduct,
	};
};

interface CreatePayloadType extends ProductFormStateType {
	orgUID: string;
}
