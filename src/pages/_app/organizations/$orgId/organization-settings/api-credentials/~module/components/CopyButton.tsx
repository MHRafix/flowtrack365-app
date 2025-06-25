import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className='md:flex items-center gap-5'>
			<Input value={text} readOnly disabled={!text} />
			<Button variant='outline' size='sm' onClick={handleCopy} disabled={!text}>
				{copied ? (
					<Check className='w-4 h-4 mr-2' />
				) : (
					<Copy className='w-4 h-4 mr-2' />
				)}
				{copied ? 'Copied' : 'Copy'}
			</Button>
		</div>
	);
}
