import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { DailyActivityFormSchema } from '../validationSchema';

interface FormFieldProps {
	name: string;
	label: string;
	labelBn: string;
	type: 'number' | 'text' | 'boolean' | 'textarea';
	register: UseFormRegister<DailyActivityFormSchema>;
	errors: FieldErrors<DailyActivityFormSchema>;
	required?: boolean;
	placeholder?: string;
	watch?: (name: string) => boolean;
	setValue?: (name: string, value: boolean) => void;
}

const FormField = ({
	name,
	label,
	labelBn,
	type,
	register,
	errors,
	required = false,
	placeholder,
	watch,
	setValue,
}: FormFieldProps) => {
	const getNestedError = (path: string): string | undefined => {
		const keys = path.split('.');
		let error: any = errors;
		for (const key of keys) {
			error = error?.[key];
		}
		return error?.message;
	};

	const errorMessage = getNestedError(name);

	if (type === 'boolean') {
		const isChecked = watch?.(name) ?? false;
		return (
			<div className='flex items-center justify-between p-4 bg-[#FBFAF5] dark:bg-background rounded-lg border border-border/30 hover:border-primary/30 transition-colors'>
				<div className='space-y-0.5'>
					<Label className='text-sm font-medium text-foreground'>{label}</Label>
					<p className='text-xs text-muted-foreground font-bangla'>{labelBn}</p>
				</div>
				<Switch
					checked={isChecked}
					onCheckedChange={(checked: any) => setValue?.(name, checked)}
				/>
			</div>
		);
	}

	if (type === 'textarea') {
		return (
			<div className='col-span-full space-y-2'>
				<Label htmlFor={name} className='text-sm font-medium text-foreground'>
					{label}{' '}
					<span className='text-muted-foreground font-bangla'>({labelBn})</span>
					{required && <span className='text-destructive ml-1'>*</span>}
				</Label>
				<Textarea
					id={name}
					{...register(name as any)}
					placeholder={placeholder}
					className={cn(
						'bg-[#FBFAF5] dark:bg-background border-border/50 focus:border-primary resize-none',
						errorMessage && 'border-destructive'
					)}
				/>
				{errorMessage && (
					<p className='text-xs text-destructive font-bangla'>{errorMessage}</p>
				)}
			</div>
		);
	}

	return (
		<div className='space-y-2'>
			<Label htmlFor={name} className='text-sm font-medium text-foreground'>
				{label}{' '}
				<span className='text-muted-foreground font-bangla'>({labelBn})</span>
				{required && <span className='text-destructive ml-1'>*</span>}
			</Label>
			<Input
				id={name}
				type={type}
				{...register(name as any, { valueAsNumber: type === 'number' })}
				placeholder={placeholder}
				className={cn(
					'bg-[#FBFAF5] dark:bg-background border-border/50 focus:border-primary',
					errorMessage && 'border-destructive'
				)}
			/>
			{errorMessage && (
				<p className='text-xs text-destructive font-bangla'>{errorMessage}</p>
			)}
		</div>
	);
};

export default FormField;
