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
					_id
					name
				}
				unit {
					_id
					name
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

export const Update_Product_Mutation = gql`
	mutation UpdateProduct($payload: UpdateProductInput!, $orgUid: String!) {
		updateProduct(payload: $payload, orgUID: $orgUid)
	}
`;

export const Update_Product_Stock_Mutation = gql`
	mutation UpdateStock(
		$payload: StockHistoryInput!
		$orgUid: String!
		$id: String!
	) {
		updateStock(payload: $payload, orgUID: $orgUid, _id: $id)
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
	query ProductCategories(
		$orgUid: String!
		$input: ProductCategoriesListQueryDto
	) {
		productCategories(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				name
			}
		}
	}
`;

export const All_Product_Brands_For_DropDown_List_Query = gql`
	query Brands($orgUid: String!, $input: BrandListQueryInput) {
		brands(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				name
			}
		}
	}
`;

export const All_Product_Units_For_DropDown_List_Query = gql`
	query Units($orgUid: String!, $input: UnitListQueryInput) {
		units(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				name
			}
		}
	}
`;

export const Product_details_Query = gql`
	query Product($id: String!, $orgUid: String!) {
		product(_id: $id, orgUID: $orgUid) {
			_id
			title
			thumbnail {
				bucket
				region
				key
				externalUrl
			}
			carouselImages {
				bucket
				region
				key
				externalUrl
			}
			gallery {
				bucket
				region
				key
				externalUrl
			}
			code
			orgUID
			model
			salePrice
			regularPrice
			discountAmount
			stock
			stockHistory {
				quantity
				stockType
				stockPrice
				date
			}
			category {
				_id
				name
			}
			brand {
				_id
				name
			}
			unit {
				_id
				name
			}
			shortDescription
			description
			sizes {
				size
				description
			}
			colors {
				color
				description
			}
			createdAt
			updatedAt
		}
	}
`;
