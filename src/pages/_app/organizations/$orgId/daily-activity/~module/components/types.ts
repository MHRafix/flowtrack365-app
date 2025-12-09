export interface ExerciseInput {
	pushUp?: number;
	squats?: number;
	seatUp?: number;
	running?: number;
	jumpingJack?: number;
	plank?: number;
	dumbbleCurl?: number;
	others?: string;
}

export interface EbadahInput {
	namajWithJamath?: number;
	extraNamaj?: number;
	ishraq?: boolean;
	tahajjud?: boolean;
	tilwat?: string;
	hadith?: number;
	readingBook?: string;
	waqiyah?: boolean;
	mulk?: boolean;
	translation?: string;
}

export interface JikirInput {
	istigfar?: number;
	durudYunus?: number;
	durud?: number;
	doaTawhid?: number;
}

export interface DailyActivity {
	_id: string;
	orgUID: string;
	user?: {
		_id: string;
		name: string;
	};
	ebadah?: EbadahInput;
	jikirAjkar?: JikirInput;
	exercise?: ExerciseInput;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface DailyActivityFormData {
	ebadah: EbadahInput;
	jikirAjkar: JikirInput;
	exercise: ExerciseInput;
}
