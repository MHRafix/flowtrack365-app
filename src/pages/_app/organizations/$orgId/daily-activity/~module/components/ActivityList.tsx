import { Accordion } from '@/components/ui/accordion';
import { CalendarDays } from 'lucide-react';
import ActivityCard from './ActivityCard';
import { DailyActivity } from './types';

interface ActivityListProps {
	activities: DailyActivity[];
	onEdit: (activity: DailyActivity) => void;
	onDelete: (id: string) => void;
}

const ActivityList = ({ activities, onEdit, onDelete }: ActivityListProps) => {
	// Get the ID of the latest activity
	const latestActivityId =
		activities.length > 0 ? activities[0]._id : undefined;

	if (activities.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center py-16 px-4 bg-card rounded-xl border border-border/50 shadow-soft'>
				<div className='w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-4'>
					<CalendarDays className='w-10 h-10 text-muted-foreground' />
				</div>
				<h3 className='text-lg font-display font-semibold text-foreground mb-2'>
					কোনো কার্যকলাপ নেই
				</h3>
				<p className='text-muted-foreground text-center font-bangla'>
					আপনার দৈনিক ইবাদত, জিকির ও ব্যায়াম রেকর্ড করতে নতুন কার্যকলাপ যোগ
					করুন।
				</p>
			</div>
		);
	}

	return (
		<div className='space-y-2'>
			<Accordion
				type='single'
				collapsible
				defaultValue={latestActivityId}
				className='space-y-0'
			>
				{activities.map((activity, index) => (
					<div
						key={activity._id}
						className='animate-fade-in'
						style={{ animationDelay: `${index * 0.05}s` }}
					>
						<ActivityCard
							activity={activity}
							onEdit={onEdit}
							onDelete={onDelete}
						/>
					</div>
				))}
			</Accordion>
		</div>
	);
};

export default ActivityList;
