import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useDailyActivities } from '@/hooks/useDailyActivities';
import { DialogTitle } from '@radix-ui/react-dialog';
import { createLazyFileRoute } from '@tanstack/react-router';
import { BookOpen, Dumbbell, Heart, Plus } from 'lucide-react';
import ActivityList from './~module/components/ActivityList';
import DailyActivityForm from './~module/components/DailyActivityForm';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/daily-activity/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const {
		activities,
		editingActivity,
		isFormOpen,
		addActivity,
		updateActivity,
		deleteActivity,
		openEditForm,
		openNewForm,
		closeForm,
	} = useDailyActivities();

	const handleSubmit = editingActivity ? updateActivity : addActivity;

	// Calculate stats
	const todayActivity = activities[0];
	const totalNamaj = todayActivity?.ebadah?.namajWithJamath || 0;
	const totalJikir =
		(todayActivity?.jikirAjkar?.istigfar || 0) +
		(todayActivity?.jikirAjkar?.durudYunus || 0) +
		(todayActivity?.jikirAjkar?.durud || 0) +
		(todayActivity?.jikirAjkar?.doaTawhid || 0);
	const totalExercise =
		(todayActivity?.exercise?.pushUp || 0) +
		(todayActivity?.exercise?.squats || 0) +
		(todayActivity?.exercise?.seatUp || 0) +
		(todayActivity?.exercise?.jumpingJack || 0);

	return (
		<div className='min-h-screen bg-background islamic-pattern'>
			{/* Main Content */}
			<main className='container mx-auto py-8 space-y-5'>
				{/* Header */}
				<div className='z-50 bg-card/80 border border-border/80 shadow-soft rounded-2xl'>
					<div className='container mx-auto px-4 py-4'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<div>
									<h1 className='font-display text-2xl font-bold text-foreground'>
										Daily Activity
									</h1>
									<p className='text-sm text-muted-foreground font-bangla'>
										দৈনিক কার্যকলাপ ট্র্যাকার
									</p>
								</div>
							</div>
							<Button onClick={openNewForm} className='gap-2'>
								<Plus className='w-5 h-5' />
								<span className='hidden sm:inline'>নতুন কার্যকলাপ</span>
								<span className='sm:hidden'>যোগ করুন</span>
							</Button>
						</div>
					</div>
				</div>
				{/* Stats Cards */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
					<div
						className='bg-card rounded-xl p-6 shadow-card border border-border/50 animate-fade-in'
						style={{ animationDelay: '0.1s' }}
					>
						<div className='flex items-center gap-4'>
							<div className='w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-soft'>
								<BookOpen className='w-7 h-7 text-primary-foreground' />
							</div>
							<div>
								<p className='text-sm text-muted-foreground font-bangla'>
									আজকের নামাজ
								</p>
								<p className='text-3xl font-display font-bold text-foreground'>
									{totalNamaj}
									<span className='text-lg text-muted-foreground'>/5</span>
								</p>
							</div>
						</div>
					</div>

					<div
						className='bg-card rounded-xl p-6 shadow-card border border-border/50 animate-fade-in'
						style={{ animationDelay: '0.2s' }}
					>
						<div className='flex items-center gap-4'>
							<div className='w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center shadow-soft'>
								<Heart className='w-7 h-7 text-background' />
							</div>
							<div>
								<p className='text-sm text-muted-foreground font-bangla'>
									আজকের জিকির
								</p>
								<p className='text-3xl font-display font-bold text-foreground'>
									{totalJikir}
								</p>
							</div>
						</div>
					</div>

					<div
						className='bg-card rounded-xl p-6 shadow-card border border-border/50 animate-fade-in'
						style={{ animationDelay: '0.3s' }}
					>
						<div className='flex items-center gap-4'>
							<div className='w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center shadow-soft'>
								<Dumbbell className='w-7 h-7 text-primary' />
							</div>
							<div>
								<p className='text-sm text-muted-foreground font-bangla'>
									আজকের ব্যায়াম
								</p>
								<p className='text-3xl font-display font-bold text-foreground'>
									{totalExercise}
									<span className='text-lg text-muted-foreground'> রেপ</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* Section Header */}
				<div className='flex items-center justify-between mb-6'>
					<div>
						<h2 className='text-xl font-display font-semibold text-foreground'>
							সকল কার্যকলাপ
						</h2>
						<p className='text-sm text-muted-foreground'>All Activities</p>
					</div>
					<p className='text-sm text-muted-foreground font-bangla'>
						{activities.length} টি রেকর্ড
					</p>
				</div>
				{/* Activity List */}
				<ActivityList
					activities={activities}
					onEdit={openEditForm}
					onDelete={deleteActivity}
				/>
			</main>

			{/* Form Dialog */}
			<Dialog open={isFormOpen} onOpenChange={(open) => !open && closeForm()}>
				<DialogContent className='!max-w-7xl !max-h-[90vh] overflow-y-auto bg-[#FBFAF5] dark:bg-background border-border'>
					<DialogHeader>
						<DialogTitle className='font-display text-xl'>
							{editingActivity
								? 'কার্যকলাপ সম্পাদনা করুন'
								: 'নতুন কার্যকলাপ যোগ করুন'}
							<span className='block text-sm font-normal text-muted-foreground mt-1'>
								{editingActivity ? 'Edit Activity' : 'Add New Activity'}
							</span>
						</DialogTitle>
					</DialogHeader>
					<DailyActivityForm
						onSubmit={handleSubmit}
						onCancel={closeForm}
						initialData={editingActivity || undefined}
						isEditing={!!editingActivity}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
