import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import {
	BookOpen,
	Check,
	Dumbbell,
	Edit,
	Heart,
	Trash2,
	X,
} from 'lucide-react';
import { DailyActivity } from './types';

interface ActivityCardProps {
	activity: DailyActivity;
	onEdit: (activity: DailyActivity) => void;
	onDelete: (id: string) => void;
}

const StatItem = ({
	label,
	labelBn,
	value,
	isBoolean = false,
}: {
	label: string;
	labelBn: string;
	value: any;
	isBoolean?: boolean;
}) => {
	if (value === undefined || value === null || value === '' || value === 0)
		return null;

	return (
		<div className='flex items-center justify-between py-2 px-3 dark:bg-background bg-[#FBFAF5] rounded-lg'>
			<span className='text-sm text-muted-foreground'>
				{label} <span className='font-bangla'>({labelBn})</span>
			</span>
			{isBoolean ? (
				value ? (
					<Check className='w-4 h-4 text-primary' />
				) : (
					<X className='w-4 h-4 text-muted-foreground' />
				)
			) : (
				<span className='font-semibold text-foreground'>{value}</span>
			)}
		</div>
	);
};

const SectionCard = ({
	title,
	titleBn,
	icon,
	children,
}: {
	title: string;
	titleBn: string;
	icon: React.ReactNode;
	children: React.ReactNode;
}) => {
	const hasContent =
		!!children && (Array.isArray(children) ? children.some(Boolean) : true);

	if (!hasContent) return null;

	return (
		<div className='bg-card rounded-lg p-4 border border-border/30'>
			<div className='flex items-center gap-2 mb-3'>
				<div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary'>
					{icon}
				</div>
				<div>
					<h4 className='font-medium text-foreground text-sm'>{title}</h4>
					<p className='text-xs text-muted-foreground font-bangla'>{titleBn}</p>
				</div>
			</div>
			<div className='space-y-2'>{children}</div>
		</div>
	);
};

const ActivityCard = ({ activity, onEdit, onDelete }: ActivityCardProps) => {
	const formattedDate = activity.createdAt
		? format(new Date(activity.createdAt), 'EEEE, dd MMMM yyyy', { locale: bn })
		: 'তারিখ নেই';

	const totalNamaj =
		(activity.ebadah?.namajWithJamath || 0) +
		(activity.ebadah?.extraNamaj || 0);
	const totalJikir =
		(activity.jikirAjkar?.istigfar || 0) +
		(activity.jikirAjkar?.durudYunus || 0) +
		(activity.jikirAjkar?.durud || 0) +
		(activity.jikirAjkar?.doaTawhid || 0);
	const totalExercise =
		(activity.exercise?.pushUp || 0) +
		(activity.exercise?.squats || 0) +
		(activity.exercise?.seatUp || 0) +
		(activity.exercise?.jumpingJack || 0);

	return (
		<AccordionItem
			value={activity._id}
			className='border border-border/80 !cursor-pointer rounded-xl overflow-hidden shadow-soft mb-3 bg-gradient-card'
		>
			<AccordionTrigger className='px-4 py-4 hover:no-underline hover:bg-secondary/20 transition-colors'>
				<div className='flex items-center justify-between w-full pr-4'>
					<div className='flex items-center gap-4'>
						<div className='w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-soft'>
							<BookOpen className='w-5 h-5 text-primary-foreground' />
						</div>
						<div className='text-left'>
							<h3 className='font-display text-md font-semibold text-foreground'>
								{formattedDate}
							</h3>
							<div className='hidden md:flex items-center gap-2 mt-1'>
								<Badge
									variant='outline'
									className='text-xs bg-primary/10 text-primary border-primary/20'
								>
									নামাজ: {totalNamaj}
								</Badge>
								<Badge
									variant='outline'
									className='text-xs bg-accent/10 text-amber-500 border-amber-500/30'
								>
									জিকির: {totalJikir}
								</Badge>
								<Badge
									variant='outline'
									className='text-xs bg-emerald-glow/10 text-emerald-glow border-emerald-glow/20'
								>
									ব্যায়াম: {totalExercise}
								</Badge>
							</div>
						</div>
					</div>
					<div
						className='flex items-center gap-2'
						onClick={(e) => e.stopPropagation()}
					>
						<Button
							// variant='icon'
							size='icon'
							onClick={() => onEdit(activity)}
							className='h-8 w-8'
						>
							<Edit className='w-4 h-4' />
						</Button>
						<Button
							// variant='icon'
							size='icon'
							onClick={() => onDelete(activity._id)}
							className='h-8 w-8 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive'
						>
							<Trash2 className='w-4 h-4' />
						</Button>
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent className='px-5 pb-5'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-2'>
					{/* Ebadah */}
					<SectionCard
						title='Ebadah'
						titleBn='ইবাদত'
						icon={<BookOpen className='w-4 h-4' />}
					>
						<StatItem
							label='Namaj with Jamath'
							labelBn='জামাতে নামাজ'
							value={activity.ebadah?.namajWithJamath}
						/>
						<StatItem
							label='Extra Namaj'
							labelBn='নফল নামাজ'
							value={activity.ebadah?.extraNamaj}
						/>
						<StatItem
							label='Ishraq'
							labelBn='ইশরাক'
							value={activity.ebadah?.ishraq}
							isBoolean
						/>
						<StatItem
							label='Tahajjud'
							labelBn='তাহাজ্জুদ'
							value={activity.ebadah?.tahajjud}
							isBoolean
						/>
						<StatItem
							label='Surah Waqiyah'
							labelBn='সূরা ওয়াকিয়াহ'
							value={activity.ebadah?.waqiyah}
							isBoolean
						/>
						<StatItem
							label='Surah Mulk'
							labelBn='সূরা মুলক'
							value={activity.ebadah?.mulk}
							isBoolean
						/>
						<StatItem
							label='Tilawat'
							labelBn='তিলাওয়াত'
							value={activity.ebadah?.tilwat}
						/>
						<StatItem
							label='Hadith'
							labelBn='হাদিস'
							value={activity.ebadah?.hadith}
						/>
						<StatItem
							label='Reading Book'
							labelBn='কিতাব পড়া'
							value={activity.ebadah?.readingBook}
						/>
						<StatItem
							label='Translation'
							labelBn='তরজমা'
							value={activity.ebadah?.translation}
						/>
					</SectionCard>

					{/* Jikir */}
					<SectionCard
						title='Jikir & Azkar'
						titleBn='জিকির ও আযকার'
						icon={<Heart className='w-4 h-4' />}
					>
						<StatItem
							label='Istigfar'
							labelBn='ইস্তেগফার'
							value={activity.jikirAjkar?.istigfar}
						/>
						<StatItem
							label='Durud Yunus'
							labelBn='দুরুদে ইউনুস'
							value={activity.jikirAjkar?.durudYunus}
						/>
						<StatItem
							label='Durud Sharif'
							labelBn='দুরুদ শরীফ'
							value={activity.jikirAjkar?.durud}
						/>
						<StatItem
							label='Doa Tawhid'
							labelBn='দোয়া তাওহীদ'
							value={activity.jikirAjkar?.doaTawhid}
						/>
					</SectionCard>

					{/* Exercise */}
					<SectionCard
						title='Exercise'
						titleBn='ব্যায়াম'
						icon={<Dumbbell className='w-4 h-4' />}
					>
						<StatItem
							label='Push Ups'
							labelBn='পুশ আপ'
							value={activity.exercise?.pushUp}
						/>
						<StatItem
							label='Squats'
							labelBn='স্কোয়াট'
							value={activity.exercise?.squats}
						/>
						<StatItem
							label='Sit Ups'
							labelBn='সিট আপ'
							value={activity.exercise?.seatUp}
						/>
						<StatItem
							label='Running'
							labelBn='দৌড়'
							value={
								activity.exercise?.running
									? `${activity.exercise.running} মিনিট`
									: undefined
							}
						/>
						<StatItem
							label='Jumping Jacks'
							labelBn='জাম্পিং জ্যাক'
							value={activity.exercise?.jumpingJack}
						/>
						<StatItem
							label='Plank'
							labelBn='প্ল্যাংক'
							value={
								activity.exercise?.plank
									? `${activity.exercise.plank} সেকেন্ড`
									: undefined
							}
						/>
						<StatItem
							label='Dumbbell Curls'
							labelBn='ডাম্বেল কার্ল'
							value={activity.exercise?.dumbbleCurl}
						/>
						<StatItem
							label='Others'
							labelBn='অন্যান্য'
							value={activity.exercise?.others}
						/>
					</SectionCard>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default ActivityCard;
