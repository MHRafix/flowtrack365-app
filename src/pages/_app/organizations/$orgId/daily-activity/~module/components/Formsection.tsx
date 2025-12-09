import { ReactNode } from 'react';

interface FormSectionProps {
	title: string;
	titleBn: string;
	icon: ReactNode;
	children: ReactNode;
}

const FormSection = ({ title, titleBn, icon, children }: FormSectionProps) => {
	return (
		<div className='bg-card rounded-xl p-6 shadow-card border border-border/50 animate-fade-in'>
			<div className='flex items-center gap-3 mb-6'>
				<div className='w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground'>
					{icon}
				</div>
				<div>
					<h3 className='font-display text-lg font-semibold text-foreground'>
						{title}
					</h3>
					<p className='text-sm text-muted-foreground font-bangla'>{titleBn}</p>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{children}
			</div>
		</div>
	);
};

export default FormSection;
