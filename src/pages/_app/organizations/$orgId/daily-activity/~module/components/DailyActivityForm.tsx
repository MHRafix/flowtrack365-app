import { Button } from '@/components/ui/button';

import { yupResolver } from '@hookform/resolvers/yup';
import { BookOpen, Dumbbell, Heart, Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { activityApi } from '../api/activityApi';
import {
	DailyActivityFormSchema,
	dailyActivitySchema,
} from '../validationSchema';
import FormField from './FormField';
import FormSection from './Formsection';
import { DailyActivity } from './types';

interface DailyActivityFormProps {
	onSubmit: (data: DailyActivityFormSchema) => void;
	onCancel?: () => void;
	initialData?: DailyActivity;
	isEditing?: boolean;
}

const DailyActivityForm = ({
	// onSubmit,
	onCancel,
	initialData,
}: // isEditing = false,
DailyActivityFormProps) => {
	const { createDailyActivity } = activityApi();
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<DailyActivityFormSchema>({
		resolver: yupResolver(dailyActivitySchema),
		defaultValues: {
			ebadah: {
				namajWithJamath: initialData?.ebadah?.namajWithJamath ?? 0,
				extraNamaj: initialData?.ebadah?.extraNamaj ?? 0,
				ishraq: initialData?.ebadah?.ishraq ?? false,
				tahajjud: initialData?.ebadah?.tahajjud ?? false,
				tilwat: initialData?.ebadah?.tilwat ?? '',
				hadith: initialData?.ebadah?.hadith ?? 0,
				readingBook: initialData?.ebadah?.readingBook ?? '',
				waqiyah: initialData?.ebadah?.waqiyah ?? false,
				mulk: initialData?.ebadah?.mulk ?? false,
				translation: initialData?.ebadah?.translation ?? '',
			},
			jikirAjkar: {
				istigfar: initialData?.jikirAjkar?.istigfar ?? 0,
				durudYunus: initialData?.jikirAjkar?.durudYunus ?? 0,
				durud: initialData?.jikirAjkar?.durud ?? 0,
				doaTawhid: initialData?.jikirAjkar?.doaTawhid ?? 0,
			},
			exercise: {
				pushUp: initialData?.exercise?.pushUp ?? 0,
				squats: initialData?.exercise?.squats ?? 0,
				seatUp: initialData?.exercise?.seatUp ?? 0,
				running: initialData?.exercise?.running ?? 0,
				jumpingJack: initialData?.exercise?.jumpingJack ?? 0,
				plank: initialData?.exercise?.plank ?? 0,
				dumbbleCurl: initialData?.exercise?.dumbbleCurl ?? 0,
				others: initialData?.exercise?.others ?? '',
			},
		},
	});

	const handleSubmitActivity = (value: any) => {
		createDailyActivity.mutate(value);
	};

	return (
		<form onSubmit={handleSubmit(handleSubmitActivity)} className='space-y-6'>
			{/* Ebadah Section */}
			<FormSection
				title='Ebadah'
				titleBn='ইবাদত'
				icon={<BookOpen className='w-5 h-5' />}
			>
				<FormField
					name='ebadah.namajWithJamath'
					label='Namaj with Jamath'
					labelBn='জামাতে নামাজ'
					type='number'
					register={register}
					errors={errors}
					required
					placeholder='0-5'
				/>
				<FormField
					name='ebadah.extraNamaj'
					label='Extra Namaj'
					labelBn='নফল নামাজ'
					type='number'
					register={register}
					errors={errors}
					placeholder='রাকাত সংখ্যা'
				/>
				<FormField
					name='ebadah.hadith'
					label='Hadith'
					labelBn='হাদিস পড়া'
					type='number'
					register={register}
					errors={errors}
					placeholder='সংখ্যা'
				/>
				<FormField
					name='ebadah.ishraq'
					label='Ishraq'
					labelBn='ইশরাক'
					type='boolean'
					register={register}
					errors={errors}
					watch={watch as any}
					setValue={setValue as any}
				/>
				<FormField
					name='ebadah.tahajjud'
					label='Tahajjud'
					labelBn='তাহাজ্জুদ'
					type='boolean'
					register={register}
					errors={errors}
					watch={watch as any}
					setValue={setValue as any}
				/>
				<FormField
					name='ebadah.waqiyah'
					label='Surah Waqiyah'
					labelBn='সূরা ওয়াকিয়াহ'
					type='boolean'
					register={register}
					errors={errors}
					watch={watch as any}
					setValue={setValue as any}
				/>
				<FormField
					name='ebadah.mulk'
					label='Surah Mulk'
					labelBn='সূরা মুলক'
					type='boolean'
					register={register}
					errors={errors}
					watch={watch as any}
					setValue={setValue as any}
				/>
				<FormField
					name='ebadah.tilwat'
					label='Tilawat'
					labelBn='তিলাওয়াত'
					type='text'
					register={register}
					errors={errors}
					placeholder='সূরা/পারা নাম'
				/>
				<FormField
					name='ebadah.readingBook'
					label='Reading Book'
					labelBn='কিতাব পড়া'
					type='text'
					register={register}
					errors={errors}
					placeholder='বইয়ের নাম'
				/>
				<FormField
					name='ebadah.translation'
					label='Translation'
					labelBn='তরজমা'
					type='textarea'
					register={register}
					errors={errors}
					placeholder='আয়াত তরজমা বা নোট...'
				/>
			</FormSection>

			{/* Jikir Section */}
			<FormSection
				title='Jikir & Azkar'
				titleBn='জিকির ও আযকার'
				icon={<Heart className='w-5 h-5' />}
			>
				<FormField
					name='jikirAjkar.istigfar'
					label='Istigfar'
					labelBn='ইস্তেগফার'
					type='number'
					register={register}
					errors={errors}
					placeholder='সংখ্যা'
				/>
				<FormField
					name='jikirAjkar.durudYunus'
					label='Durud Yunus'
					labelBn='দুরুদে ইউনুস'
					type='number'
					register={register}
					errors={errors}
					placeholder='সংখ্যা'
				/>
				<FormField
					name='jikirAjkar.durud'
					label='Durud Sharif'
					labelBn='দুরুদ শরীফ'
					type='number'
					register={register}
					errors={errors}
					placeholder='সংখ্যা'
				/>
				<FormField
					name='jikirAjkar.doaTawhid'
					label='Doa Tawhid'
					labelBn='দোয়া তাওহীদ'
					type='number'
					register={register}
					errors={errors}
					placeholder='সংখ্যা'
				/>
			</FormSection>

			{/* Exercise Section */}
			<FormSection
				title='Exercise'
				titleBn='ব্যায়াম'
				icon={<Dumbbell className='w-5 h-5' />}
			>
				<FormField
					name='exercise.pushUp'
					label='Push Ups'
					labelBn='পুশ আপ'
					type='number'
					register={register}
					errors={errors}
					placeholder='সংখ্যা'
				/>
				<FormField
					name='exercise.squats'
					label='Squats'
					labelBn='স্কোয়াট'
					type='number'
					register={register}
					errors={errors}
					placeholder='সংখ্যা'
				/>
				<FormField
					name='exercise.seatUp'
					label='Sit Ups'
					labelBn='সিট আপ'
					type='number'
					register={register}
					errors={errors}
					placeholder='সংখ্যা'
				/>
				<FormField
					name='exercise.running'
					label='Running (mins)'
					labelBn='দৌড় (মিনিট)'
					type='number'
					register={register}
					errors={errors}
					placeholder='মিনিট'
				/>
				<FormField
					name='exercise.jumpingJack'
					label='Jumping Jacks'
					labelBn='জাম্পিং জ্যাক'
					type='number'
					register={register}
					errors={errors}
					placeholder='সংখ্যা'
				/>
				<FormField
					name='exercise.plank'
					label='Plank (secs)'
					labelBn='প্ল্যাংক (সেকেন্ড)'
					type='number'
					register={register}
					errors={errors}
					placeholder='সেকেন্ড'
				/>
				<FormField
					name='exercise.dumbbleCurl'
					label='Dumbbell Curls'
					labelBn='ডাম্বেল কার্ল'
					type='number'
					register={register}
					errors={errors}
					placeholder='সংখ্যা'
				/>
				<FormField
					name='exercise.others'
					label='Others'
					labelBn='অন্যান্য'
					type='textarea'
					register={register}
					errors={errors}
					placeholder='অন্যান্য ব্যায়াম...'
				/>
			</FormSection>

			{/* Submit Buttons */}
			<div className='flex justify-end gap-3 pt-4'>
				{onCancel && (
					<Button
						type='button'
						variant='outline'
						onClick={onCancel}
						className='gap-2'
					>
						<X className='w-4 h-4' />
						বাতিল
					</Button>
				)}
				<Button
					type='submit'
					// variant='primary'
					disabled={createDailyActivity.isPending}
					className='gap-2'
				>
					<Save className='w-4 h-4' />
					{createDailyActivity.isPending ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
				</Button>
			</div>
		</form>
	);
};

export default DailyActivityForm;
