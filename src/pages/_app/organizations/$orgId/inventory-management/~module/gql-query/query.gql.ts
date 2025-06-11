import { gql } from '@/lib/api-client';

export const All_Products_Query = gql`
	query Products($orgUid: String!) {
		products(orgUID: $orgUid) {
			nodes {
				_id
				title
				code
				orgUID
				model
				salePrice
				regularPrice
				discountAmount
				stock
				category {
					_id
					name
				}
				brand {
					exampleField
				}
				unit {
					exampleField
				}

				createdAt
				updatedAt
			}
			meta {
				totalCount
				currentPage
				hasNextPage
				totalPages
			}
		}
	}
`;

export const Create_Product_Mutation = gql`
	mutation CreateProduct($payload: CreateProductInput!) {
		createProduct(payload: $payload)
	}
`;

export const Remove_Product_Mutation = gql`
	mutation RemoveProduct($id: String!) {
		removeProduct(_id: $id) {
			_id
		}
	}
`;

export const All_Product_Categories_For_DropDown_List_Query = gql`
	query ProductCategories {
		productCategories {
			_id
			name
		}
	}
`;

export const Product_Categories_Query = gql`
	query ProductCategories(
		$orgUid: String!
		$input: ProductCategoriesListQueryDto
	) {
		productCategories(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				name
				description
				orgUID
				createdAt
				updatedAt
			}
			meta {
				totalCount
				currentPage
				hasNextPage
				totalPages
			}
		}
	}
`;

export const Create_Product_Category_Mutation = gql`
	mutation CreateProductCategory($payload: CreateProductCategoryInput!) {
		createProductCategory(payload: $payload)
	}
`;

export const Remove_Product_Category_Mutation = gql`
	mutation RemoveProductCategory($id: String!) {
		removeProductCategory(_id: $id) {
			_id
		}
	}
`;
