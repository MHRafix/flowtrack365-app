import { DailyActivity } from '@/pages/_app/organizations/$orgId/daily-activity/~module/components/types';
import { DailyActivityFormSchema } from '@/pages/_app/organizations/$orgId/daily-activity/~module/validationSchema';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

// Sample initial data
const initialActivities: DailyActivity[] = [
	{
		_id: '1',
		orgUID: 'org1',
		ebadah: {
			namajWithJamath: 5,
			extraNamaj: 4,
			ishraq: true,
			tahajjud: true,
			tilwat: 'সূরা বাকারা',
			hadith: 3,
			readingBook: 'রিয়াদুস সালেহীন',
			waqiyah: true,
			mulk: true,
			translation: 'সূরা ফাতিহার তাফসীর',
		},
		jikirAjkar: {
			istigfar: 100,
			durudYunus: 40,
			durud: 100,
			doaTawhid: 100,
		},
		exercise: {
			pushUp: 30,
			squats: 50,
			seatUp: 40,
			running: 20,
			jumpingJack: 50,
			plank: 60,
			dumbbleCurl: 20,
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_id: '2',
		orgUID: 'org1',
		ebadah: {
			namajWithJamath: 4,
			extraNamaj: 2,
			ishraq: false,
			tahajjud: true,
			tilwat: 'সূরা ইয়াসিন',
			hadith: 2,
			waqiyah: true,
			mulk: true,
		},
		jikirAjkar: {
			istigfar: 70,
			durudYunus: 30,
			durud: 50,
			doaTawhid: 50,
		},
		exercise: {
			pushUp: 25,
			squats: 40,
			running: 15,
		},
		createdAt: new Date(Date.now() - 86400000),
		updatedAt: new Date(Date.now() - 86400000),
	},
	{
		_id: '3',
		orgUID: 'org1',
		ebadah: {
			namajWithJamath: 3,
			extraNamaj: 0,
			ishraq: false,
			tahajjud: false,
			hadith: 1,
			mulk: true,
		},
		jikirAjkar: {
			istigfar: 50,
			durud: 30,
		},
		exercise: {
			pushUp: 15,
			running: 10,
		},
		createdAt: new Date(Date.now() - 172800000),
		updatedAt: new Date(Date.now() - 172800000),
	},
];

export const useDailyActivities = () => {
	const [activities, setActivities] =
		useState<DailyActivity[]>(initialActivities);
	const [editingActivity, setEditingActivity] = useState<DailyActivity | null>(
		null
	);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const addActivity = useCallback((data: DailyActivityFormSchema) => {
		const newActivity: DailyActivity = {
			_id: Date.now().toString(),
			orgUID: 'org1',

			// @ts-ignore
			ebadah: data.ebadah!,

			// @ts-ignore
			jikirAjkar: data.jikirAjkar!,

			// @ts-ignore
			exercise: data.exercise!,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		setActivities((prev) => [newActivity, ...prev]);
		setIsFormOpen(false);
		toast.success('নতুন কার্যকলাপ সংরক্ষণ করা হয়েছে।');
	}, []);

	const updateActivity = useCallback(
		(data: DailyActivityFormSchema) => {
			if (!editingActivity) return;

			setActivities((prev: any) =>
				prev.map((activity: any) =>
					activity._id === editingActivity._id
						? {
								...activity,
								ebadah: data.ebadah,
								jikirAjkar: data.jikirAjkar,
								exercise: data.exercise,
								updatedAt: new Date(),
						  }
						: activity
				)
			);

			setEditingActivity(null);
			setIsFormOpen(false);
			toast.success('কার্যকলাপ আপডেট করা হয়েছে।');
		},
		[editingActivity]
	);

	const deleteActivity = useCallback((id: string) => {
		setActivities((prev) => prev.filter((activity) => activity._id !== id));
		toast.error('কার্যকলাপ সফলভাবে মুছে ফেলা হয়েছে।');
	}, []);

	const openEditForm = useCallback((activity: DailyActivity) => {
		setEditingActivity(activity);
		setIsFormOpen(true);
	}, []);

	const openNewForm = useCallback(() => {
		setEditingActivity(null);
		setIsFormOpen(true);
	}, []);

	const closeForm = useCallback(() => {
		setEditingActivity(null);
		setIsFormOpen(false);
	}, []);

	return {
		activities,
		editingActivity,
		isFormOpen,
		addActivity,
		updateActivity,
		deleteActivity,
		openEditForm,
		openNewForm,
		closeForm,
	};
};
