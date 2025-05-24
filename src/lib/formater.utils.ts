export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'BDT',
	}).format(amount);
};

export const formatDate = (date: string, locale: string = 'en-BD') => {
	if (!date) {
		return '';
	}
	return new Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		// hour: "2-digit",
		// minute: "2-digit",
		// second: "2-digit",
		// hour12: true,
	}).format(new Date(date));
};
