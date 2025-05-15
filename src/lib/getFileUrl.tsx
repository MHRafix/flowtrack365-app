import { ServerFileReference } from '@/types/commonModelTypes';

export const getFileUrl = (s3Object: ServerFileReference) => {
	if (!s3Object?.key) return null;

	return `https://cdn.flowTrack365.com/${s3Object?.key}`;
};
