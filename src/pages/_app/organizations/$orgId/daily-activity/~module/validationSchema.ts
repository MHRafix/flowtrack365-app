import * as yup from 'yup';

export const dailyActivitySchema = yup.object().shape({
	ebadah: yup.object().shape({
		namajWithJamath: yup
			.number()
			.min(0, 'সর্বনিম্ন ০')
			.max(5, 'সর্বোচ্চ ৫ ওয়াক্ত')
			.required('জামাতে নামাজ আবশ্যক'),
		extraNamaj: yup.number().min(0, 'সর্বনিম্ন ০').nullable(),
		ishraq: yup.boolean(),
		tahajjud: yup.boolean(),
		tilwat: yup.string(),
		hadith: yup.number().min(0, 'সর্বনিম্ন ০').nullable(),
		readingBook: yup.string(),
		waqiyah: yup.boolean(),
		mulk: yup.boolean(),
		translation: yup.string(),
	}),
	jikirAjkar: yup.object().shape({
		istigfar: yup.number().min(0, 'সর্বনিম্ন ০').nullable(),
		durudYunus: yup.number().min(0, 'সর্বনিম্ন ০').nullable(),
		durud: yup.number().min(0, 'সর্বনিম্ন ০').nullable(),
		doaTawhid: yup.number().min(0, 'সর্বনিম্ন ০').nullable(),
	}),
	exercise: yup.object().shape({
		pushUp: yup.number().min(0, 'সর্বনিম্ন ০').nullable(),
		squats: yup.number().min(0, 'সর্বনিম্ন ০').nullable(),
		seatUp: yup.number().min(0, 'সর্বনিম্ন ০').nullable(),
		running: yup.number().min(0, 'সর্বনিম্ন ০').nullable(),
		jumpingJack: yup.number().min(0, 'সর্বনিম্ন ০').nullable(),
		plank: yup.number().min(0, 'সর্বনিম্ন ০').nullable(),
		dumbbleCurl: yup.number().min(0, 'সর্বনিম্ন ০').nullable(),
		others: yup.string(),
	}),
});

export type DailyActivityFormSchema = yup.InferType<typeof dailyActivitySchema>;
