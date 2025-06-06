import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config({
	path: '.env',
});

const config: CodegenConfig = {
	schema: `${process.env.VITE_APP_BUSINESS_API_URL}/graphql`,
	documents: ['src/**/*.tsx'],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		'./src/gql/': {
			preset: 'client',
		},
	},
};
export default config;
