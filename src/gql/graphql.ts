/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export enum ActionType {
  Deposit = 'Deposit',
  Expense = 'Expense',
  Withdraw = 'Withdraw'
}

export type Adjustment = {
  __typename?: 'Adjustment';
  _id?: Maybe<Scalars['ID']['output']>;
  account: BankAccount;
  amount: Scalars['Int']['output'];
  balance?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expense?: Maybe<Expense>;
  orgUID: Scalars['String']['output'];
  type: ActionType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AdjustmentListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type AdjustmentPagination = {
  __typename?: 'AdjustmentPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<Adjustment>>;
};

export type AllOrder = {
  __typename?: 'AllOrder';
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['output'];
};

export type ApiCommonActionOutput = {
  __typename?: 'ApiCommonActionOutput';
  data?: Maybe<Scalars['JSON']['output']>;
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type Attendance = {
  __typename?: 'Attendance';
  _id?: Maybe<Scalars['ID']['output']>;
  attendee: User;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Attendance_Status>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  verifyBy?: Maybe<User>;
};

export type AttendancePagination = {
  __typename?: 'AttendancePagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<Attendance>>;
};

export type AttendanceQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export enum Attendance_Status {
  NotPresent = 'NOT_PRESENT',
  Pending = 'PENDING',
  Verified = 'VERIFIED'
}

export type BankAccount = {
  __typename?: 'BankAccount';
  _id?: Maybe<Scalars['ID']['output']>;
  balance?: Maybe<Scalars['Float']['output']>;
  bankName: Scalars['String']['output'];
  branch: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  holderName: Scalars['String']['output'];
  orgUID: Scalars['String']['output'];
  reference: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BankAccountListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type BankAccountPagination = {
  __typename?: 'BankAccountPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<BankAccount>>;
};

export type Brand = {
  __typename?: 'Brand';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  logo?: Maybe<ServerFileEntity>;
  name: Scalars['String']['output'];
  orgUID: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BrandListQueryInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type BrandPagination = {
  __typename?: 'BrandPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<Brand>>;
};

export type ClientData = {
  __typename?: 'ClientData';
  _id?: Maybe<Scalars['ID']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
};

export type ColorInput = {
  color: Scalars['String']['input'];
  description: Scalars['String']['input'];
};

export type ColorSchema = {
  __typename?: 'ColorSchema';
  color: Scalars['String']['output'];
  description: Scalars['String']['output'];
};

export type CommonMatchInput = {
  key: Scalars['String']['input'];
  operator: MatchOperator;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAdjustmentInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  account: Scalars['String']['input'];
  amount: Scalars['Int']['input'];
  balance?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expense?: InputMaybe<Scalars['String']['input']>;
  orgUID: Scalars['String']['input'];
  type: ActionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateAllOrderInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateAttendanceInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  attendee: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Attendance_Status>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  verifyBy?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBankAccountInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  balance?: InputMaybe<Scalars['Float']['input']>;
  bankName: Scalars['String']['input'];
  branch: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  holderName: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
  reference: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateBrandInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  logo?: InputMaybe<ServerFileInput>;
  name: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateEmployeeInput = {
  employeeDetails: Scalars['String']['input'];
  organizations: Array<EmployeeOrganizationInput>;
};

export type CreateExpenseCategoryInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  orgUID: Scalars['String']['input'];
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateOrganizationInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  address: Scalars['String']['input'];
  businessEmail: Scalars['String']['input'];
  businessPhone: Scalars['String']['input'];
  cover?: InputMaybe<ServerFileInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  employees?: InputMaybe<Array<Scalars['String']['input']>>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  orgUID?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  settings?: InputMaybe<OrganizationSettingsInput>;
  status?: InputMaybe<Organization_Status>;
  tagline?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateProductCategoryInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateProductInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  carouselImages?: InputMaybe<Array<ServerFileInput>>;
  category: Scalars['String']['input'];
  code: Scalars['String']['input'];
  colors?: InputMaybe<Array<ColorInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Float']['input']>;
  gallery?: InputMaybe<Array<ServerFileInput>>;
  model?: InputMaybe<Scalars['String']['input']>;
  orgUID: Scalars['String']['input'];
  regularPrice: Scalars['Float']['input'];
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  sizes?: InputMaybe<Array<SizeInput>>;
  stock: Scalars['Float']['input'];
  stockHistory?: InputMaybe<Array<StockHistoryInput>>;
  thumbnail?: InputMaybe<ServerFileInput>;
  title: Scalars['String']['input'];
  unit?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateSavingInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  amount: Scalars['Float']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  orgUID: Scalars['String']['input'];
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateTaskManagementInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  client: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deadLine: Scalars['DateTime']['input'];
  dueAmount: Scalars['Int']['input'];
  files?: InputMaybe<Array<ServerFileReferenceInput>>;
  paidBillAmount: Scalars['Int']['input'];
  paymentStatus?: Payment_Status;
  progressStatus?: InputMaybe<Task_Progress_Status>;
  taskCreatedBy: Scalars['String']['input'];
  taskDetails: TaskDetails;
  taskId: Scalars['String']['input'];
  totalBillAmount: Scalars['Int']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateUnitInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
  unitCode: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Employee = {
  __typename?: 'Employee';
  _id?: Maybe<Scalars['ID']['output']>;
  employeeDetails: User;
  organizations: Array<EmployeeOrganizationSchema>;
};

export type EmployeeListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type EmployeeOrganizationInput = {
  organization: Scalars['String']['input'];
  role: Scalars['String']['input'];
  salary?: InputMaybe<Scalars['Float']['input']>;
};

export type EmployeeOrganizationSchema = {
  __typename?: 'EmployeeOrganizationSchema';
  organization: Organization;
  role: Scalars['String']['output'];
  salary?: Maybe<Scalars['Float']['output']>;
};

export type EmployeePagination = {
  __typename?: 'EmployeePagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<Employee>>;
};

export type Expense = {
  __typename?: 'Expense';
  _id?: Maybe<Scalars['ID']['output']>;
  amount: Scalars['Float']['output'];
  category: ExpenseCategory;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator: Employee;
  description?: Maybe<Scalars['String']['output']>;
  fromAccount?: Maybe<BankAccount>;
  orgUID: Scalars['String']['output'];
  statement?: Maybe<Adjustment>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ExpenseCalculationInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  amount: Scalars['Float']['input'];
  category: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  creator: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  fromAccount?: InputMaybe<Scalars['String']['input']>;
  orgUID: Scalars['String']['input'];
  statement?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ExpenseCalculationPagination = {
  __typename?: 'ExpenseCalculationPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<Expense>>;
};

export type ExpenseCategory = {
  __typename?: 'ExpenseCategory';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  orgUID: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ExpenseCategoryListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type ExpenseCategoryPagination = {
  __typename?: 'ExpenseCategoryPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<ExpenseCategory>>;
};

export type ExpenseListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type InviteMemberToOrganizationInput = {
  email: Scalars['String']['input'];
  orgId: Scalars['String']['input'];
};

export type MagicLinkAuthenticationInput = {
  email: Scalars['String']['input'];
};

export enum MatchOperator {
  Contains = 'contains',
  Eq = 'eq',
  Exists = 'exists',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  Lt = 'lt',
  Lte = 'lte',
  Ne = 'ne',
  Nin = 'nin'
}

export type Mutation = {
  __typename?: 'Mutation';
  bulkRemoveEmployee?: Maybe<Scalars['Boolean']['output']>;
  createAdjustment: Scalars['Boolean']['output'];
  createAllOrder: AllOrder;
  createAttendance: Scalars['Boolean']['output'];
  createBankAccount: Scalars['Boolean']['output'];
  createBrand: Scalars['Boolean']['output'];
  createEmployee: Employee;
  createExpenseCalculation: Scalars['Boolean']['output'];
  createExpenseCategory: Scalars['Boolean']['output'];
  createOrganization: Organization;
  createProduct: Scalars['Boolean']['output'];
  createProductCategory: Scalars['Boolean']['output'];
  createSaving: Saving;
  createTask: TaskManagement;
  createUnit: Scalars['Boolean']['output'];
  disableOrganization: Scalars['Boolean']['output'];
  generateApiKey: Scalars['Boolean']['output'];
  generateApiToken: Scalars['Boolean']['output'];
  registration: ApiCommonActionOutput;
  removeAdjustment: Adjustment;
  removeAllOrder: AllOrder;
  removeAttendance?: Maybe<Scalars['Boolean']['output']>;
  removeBankAccount: BankAccount;
  removeBrand: Scalars['Boolean']['output'];
  removeEmployee?: Maybe<Scalars['Boolean']['output']>;
  removeExpense?: Maybe<Scalars['Boolean']['output']>;
  removeExpenseCategory?: Maybe<Scalars['Boolean']['output']>;
  removeProduct: Product;
  removeProductCategory: ProductCategory;
  removeSaving: Saving;
  removeTask?: Maybe<Scalars['Boolean']['output']>;
  removeUnit: Scalars['Boolean']['output'];
  removeUser?: Maybe<Scalars['Boolean']['output']>;
  sendInviteToMember: ApiCommonActionOutput;
  sendMagicLink: ApiCommonActionOutput;
  updateAdjustment: Adjustment;
  updateAllOrder: AllOrder;
  updateAttendance: Scalars['Boolean']['output'];
  updateBankAccount: BankAccount;
  updateBrand: Scalars['Boolean']['output'];
  updateEmployee: Employee;
  updateExpenseCalculation: Scalars['Boolean']['output'];
  updateExpenseCategory: Scalars['Boolean']['output'];
  updateOrganization: Organization;
  updateProduct: Scalars['Boolean']['output'];
  updateProductCategory: ProductCategory;
  updateSaving: Saving;
  updateStock: Scalars['Boolean']['output'];
  updateTask: Scalars['Boolean']['output'];
  updateUnit: Scalars['Boolean']['output'];
  updateUser: User;
  updateUserAndEmployeeRole: Scalars['Boolean']['output'];
  verifyMagicLink: ApiCommonActionOutput;
  verifyMemberInvitation: ApiCommonActionOutput;
};


export type MutationBulkRemoveEmployeeArgs = {
  uIds: Array<Scalars['String']['input']>;
};


export type MutationCreateAdjustmentArgs = {
  payload: CreateAdjustmentInput;
};


export type MutationCreateAllOrderArgs = {
  createAllOrderInput: CreateAllOrderInput;
};


export type MutationCreateAttendanceArgs = {
  input: CreateAttendanceInput;
};


export type MutationCreateBankAccountArgs = {
  payload: CreateBankAccountInput;
};


export type MutationCreateBrandArgs = {
  payload: CreateBrandInput;
};


export type MutationCreateEmployeeArgs = {
  input: CreateEmployeeInput;
};


export type MutationCreateExpenseCalculationArgs = {
  input: ExpenseCalculationInput;
};


export type MutationCreateExpenseCategoryArgs = {
  input: CreateExpenseCategoryInput;
};


export type MutationCreateOrganizationArgs = {
  payload: CreateOrganizationInput;
};


export type MutationCreateProductArgs = {
  payload: CreateProductInput;
};


export type MutationCreateProductCategoryArgs = {
  payload: CreateProductCategoryInput;
};


export type MutationCreateSavingArgs = {
  payload: CreateSavingInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskManagementInput;
};


export type MutationCreateUnitArgs = {
  payload: CreateUnitInput;
};


export type MutationDisableOrganizationArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
};


export type MutationGenerateApiKeyArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
};


export type MutationGenerateApiTokenArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
};


export type MutationRegistrationArgs = {
  input: RegistrationUserInput;
};


export type MutationRemoveAdjustmentArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveAllOrderArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveAttendanceArgs = {
  input: CommonMatchInput;
};


export type MutationRemoveBankAccountArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveBrandArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
};


export type MutationRemoveEmployeeArgs = {
  input: CommonMatchInput;
};


export type MutationRemoveExpenseArgs = {
  input: CommonMatchInput;
};


export type MutationRemoveExpenseCategoryArgs = {
  input: CommonMatchInput;
};


export type MutationRemoveProductArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveProductCategoryArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveSavingArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveTaskArgs = {
  input: CommonMatchInput;
};


export type MutationRemoveUnitArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  input: CommonMatchInput;
};


export type MutationSendInviteToMemberArgs = {
  payload: InviteMemberToOrganizationInput;
};


export type MutationSendMagicLinkArgs = {
  payload: MagicLinkAuthenticationInput;
};


export type MutationUpdateAdjustmentArgs = {
  payload: UpdateAdjustmentInput;
};


export type MutationUpdateAllOrderArgs = {
  updateAllOrderInput: UpdateAllOrderInput;
};


export type MutationUpdateAttendanceArgs = {
  input: UpdateAttendanceInput;
};


export type MutationUpdateBankAccountArgs = {
  payload: UpdateBankAccountInput;
};


export type MutationUpdateBrandArgs = {
  orgUID: Scalars['String']['input'];
  payload: UpdateBrandInput;
};


export type MutationUpdateEmployeeArgs = {
  input: UpdateEmployeeInput;
};


export type MutationUpdateExpenseCalculationArgs = {
  updateExpenseCalculationInput: UpdateExpenseCalculationInput;
};


export type MutationUpdateExpenseCategoryArgs = {
  payload: UpdateExpenseCategoryInput;
};


export type MutationUpdateOrganizationArgs = {
  orgUID: Scalars['String']['input'];
  updatePayload: UpdateOrganizationInput;
};


export type MutationUpdateProductArgs = {
  orgUID: Scalars['String']['input'];
  payload: UpdateProductInput;
};


export type MutationUpdateProductCategoryArgs = {
  payload: UpdateProductCategoryInput;
};


export type MutationUpdateSavingArgs = {
  payload: UpdateSavingInput;
};


export type MutationUpdateStockArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
  payload: StockHistoryInput;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskManagementInput;
};


export type MutationUpdateUnitArgs = {
  orgUID: Scalars['String']['input'];
  payload: UpdateUnitInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserAndEmployeeRoleArgs = {
  input: UpdateUserAndEmployeeRoleInput;
};


export type MutationVerifyMagicLinkArgs = {
  payload: VerifyMagicLinkInput;
};


export type MutationVerifyMemberInvitationArgs = {
  payload: VerifyInviteMemberToOrganizationInput;
};

export type Organization = {
  __typename?: 'Organization';
  Logo?: Maybe<ServerFileEntity>;
  _id?: Maybe<Scalars['ID']['output']>;
  address: Scalars['String']['output'];
  businessEmail: Scalars['String']['output'];
  businessPhone: Scalars['String']['output'];
  cover?: Maybe<ServerFileEntity>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  employees?: Maybe<Array<Employee>>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  orgUID?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Employee>;
  settings?: Maybe<OrganizationSettingsSchema>;
  status?: Maybe<Organization_Status>;
  tagline?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OrganizationListQueryInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type OrganizationSettingsInput = {
  apiKey?: InputMaybe<Scalars['String']['input']>;
  apiToken?: InputMaybe<Scalars['String']['input']>;
};

export type OrganizationSettingsSchema = {
  __typename?: 'OrganizationSettingsSchema';
  apiKey?: Maybe<Scalars['String']['output']>;
  apiToken?: Maybe<Scalars['String']['output']>;
};

export type OrganizationWithPagination = {
  __typename?: 'OrganizationWithPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<Organization>>;
};

export enum Organization_Status {
  Active = 'Active',
  Disable = 'Disable',
  InActive = 'InActive',
  Pending = 'Pending'
}

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  currentPage: Scalars['Float']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  totalCount: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export enum Payment_Status {
  Cancelled = 'CANCELLED',
  Due = 'DUE',
  Paid = 'PAID',
  PartiallyPaid = 'PARTIALLY_PAID',
  Refunded = 'REFUNDED'
}

export type Product = {
  __typename?: 'Product';
  _id?: Maybe<Scalars['ID']['output']>;
  brand?: Maybe<Brand>;
  carouselImages?: Maybe<Array<ServerFileEntity>>;
  category: ProductCategory;
  code: Scalars['String']['output'];
  colors?: Maybe<Array<ColorSchema>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  gallery?: Maybe<Array<ServerFileEntity>>;
  model?: Maybe<Scalars['String']['output']>;
  orgUID: Scalars['String']['output'];
  regularPrice: Scalars['Float']['output'];
  salePrice?: Maybe<Scalars['Float']['output']>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  sizes?: Maybe<Array<SizeSchema>>;
  stock: Scalars['Float']['output'];
  stockHistory?: Maybe<Array<StockHistorySchema>>;
  thumbnail?: Maybe<ServerFileEntity>;
  title: Scalars['String']['output'];
  unit?: Maybe<Unit>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductCategoriesListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  orgUID: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductCategoryPagination = {
  __typename?: 'ProductCategoryPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<ProductCategory>>;
};

export type ProductListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type ProductPagination = {
  __typename?: 'ProductPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<Product>>;
};

export type Query = {
  __typename?: 'Query';
  Attendance: Attendance;
  Attendances: AttendancePagination;
  Employee: Employee;
  adjustment: Adjustment;
  adjustments: AdjustmentPagination;
  allEmployeeIds: Array<Scalars['String']['output']>;
  allEmployees: EmployeePagination;
  allOrder: AllOrder;
  allOrders: Array<AllOrder>;
  bankAccount: BankAccount;
  bankAccounts: BankAccountPagination;
  brand: Brand;
  brands: BrandPagination;
  expenseCalculation: Expense;
  expenseCalculationList: ExpenseCalculationPagination;
  expenseCategories: ExpenseCategoryPagination;
  expenseCategory: ExpenseCategory;
  myOrganizations: OrganizationWithPagination;
  organization: Organization;
  organizationByUID: Organization;
  organizations: OrganizationWithPagination;
  product: Product;
  productCategories: ProductCategoryPagination;
  productCategory: ProductCategory;
  products: ProductPagination;
  saving: Saving;
  savings: SavingPagination;
  task: TaskManagement;
  taskList: TaskManagementPagination;
  unit: Unit;
  units: UnitPagination;
  user: User;
  users: UserPagination;
};


export type QueryAttendanceArgs = {
  input: CommonMatchInput;
};


export type QueryAttendancesArgs = {
  input?: InputMaybe<AttendanceQueryDto>;
};


export type QueryEmployeeArgs = {
  input: CommonMatchInput;
};


export type QueryAdjustmentArgs = {
  _id: Scalars['String']['input'];
};


export type QueryAdjustmentsArgs = {
  account: Scalars['String']['input'];
  input?: InputMaybe<AdjustmentListQueryDto>;
  orgUID: Scalars['String']['input'];
};


export type QueryAllEmployeesArgs = {
  input?: InputMaybe<EmployeeListQueryDto>;
};


export type QueryAllOrderArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBankAccountArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
};


export type QueryBankAccountsArgs = {
  input?: InputMaybe<BankAccountListQueryDto>;
  orgUID: Scalars['String']['input'];
};


export type QueryBrandArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
};


export type QueryBrandsArgs = {
  input?: InputMaybe<BrandListQueryInput>;
  orgUID: Scalars['String']['input'];
};


export type QueryExpenseCalculationArgs = {
  input: CommonMatchInput;
};


export type QueryExpenseCalculationListArgs = {
  creatorId: Scalars['String']['input'];
  input?: InputMaybe<ExpenseListQueryDto>;
  orgUID: Scalars['String']['input'];
};


export type QueryExpenseCategoriesArgs = {
  input?: InputMaybe<ExpenseCategoryListQueryDto>;
  orgUID: Scalars['String']['input'];
};


export type QueryExpenseCategoryArgs = {
  input: CommonMatchInput;
};


export type QueryMyOrganizationsArgs = {
  _id: Scalars['String']['input'];
  input?: InputMaybe<OrganizationListQueryInput>;
};


export type QueryOrganizationArgs = {
  _id: Scalars['String']['input'];
};


export type QueryOrganizationByUidArgs = {
  orgUID: Scalars['String']['input'];
};


export type QueryOrganizationsArgs = {
  input?: InputMaybe<OrganizationListQueryInput>;
};


export type QueryProductArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
};


export type QueryProductCategoriesArgs = {
  input?: InputMaybe<ProductCategoriesListQueryDto>;
  orgUID: Scalars['String']['input'];
};


export type QueryProductCategoryArgs = {
  _id: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  input?: InputMaybe<ProductListQueryDto>;
  orgUID: Scalars['String']['input'];
};


export type QuerySavingArgs = {
  _id: Scalars['String']['input'];
};


export type QuerySavingsArgs = {
  input?: InputMaybe<SavingListQueryDto>;
  orgUID: Scalars['String']['input'];
};


export type QueryTaskArgs = {
  input: CommonMatchInput;
};


export type QueryTaskListArgs = {
  input?: InputMaybe<TaskListQueryDto>;
};


export type QueryUnitArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
};


export type QueryUnitsArgs = {
  input?: InputMaybe<UnitListQueryInput>;
  orgUID: Scalars['String']['input'];
};


export type QueryUserArgs = {
  input: CommonMatchInput;
};


export type QueryUsersArgs = {
  input?: InputMaybe<UserListQueryDto>;
};

export type RegistrationUserInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  /** User avatar */
  avatar?: InputMaybe<Scalars['String']['input']>;
  /** User email */
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  /** User role */
  role?: InputMaybe<User_Role>;
};

export type Saving = {
  __typename?: 'Saving';
  _id?: Maybe<Scalars['ID']['output']>;
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  orgUID: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SavingListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type SavingPagination = {
  __typename?: 'SavingPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<Saving>>;
};

export type ServerFileEntity = {
  __typename?: 'ServerFileEntity';
  bucket?: Maybe<Scalars['String']['output']>;
  externalUrl?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
};

export type ServerFileInput = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  externalUrl?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
};

export type ServerFileReference = {
  __typename?: 'ServerFileReference';
  fileUrl: Scalars['String']['output'];
};

export type ServerFileReferenceInput = {
  fileUrl: Scalars['String']['input'];
};

export type SizeInput = {
  description: Scalars['String']['input'];
  size: Scalars['String']['input'];
};

export type SizeSchema = {
  __typename?: 'SizeSchema';
  description: Scalars['String']['output'];
  size: Scalars['String']['output'];
};

export enum SortType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StockHistoryInput = {
  date: Scalars['DateTime']['input'];
  quantity: Scalars['Int']['input'];
  stockPrice: Scalars['Float']['input'];
  stockType: StockType;
  updatedBy: Scalars['String']['input'];
};

export type StockHistorySchema = {
  __typename?: 'StockHistorySchema';
  date: Scalars['DateTime']['output'];
  quantity: Scalars['Int']['output'];
  stockPrice: Scalars['Float']['output'];
  stockType: StockType;
  updatedBy: Employee;
};

export enum StockType {
  StockIn = 'Stock_In',
  StockOut = 'Stock_Out'
}

export type TaskDetails = {
  issuesDescription?: InputMaybe<Scalars['String']['input']>;
  taskAssignTo: Scalars['String']['input'];
  taskDescription?: InputMaybe<Scalars['String']['input']>;
  taskName: Scalars['String']['input'];
};

export type TaskListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type TaskManagement = {
  __typename?: 'TaskManagement';
  _id?: Maybe<Scalars['ID']['output']>;
  client: ClientData;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deadLine: Scalars['DateTime']['output'];
  dueAmount: Scalars['Int']['output'];
  files?: Maybe<Array<ServerFileReference>>;
  paidBillAmount: Scalars['Int']['output'];
  paymentStatus: Payment_Status;
  progressStatus?: Maybe<Task_Progress_Status>;
  taskCreatedBy: User;
  taskDetails: TaskManagement_TaskDetails;
  taskId: Scalars['String']['output'];
  totalBillAmount: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TaskManagementPagination = {
  __typename?: 'TaskManagementPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<TaskManagement>>;
};

export type TaskManagement_TaskDetails = {
  __typename?: 'TaskManagement_TaskDetails';
  issuesDescription?: Maybe<Scalars['String']['output']>;
  taskAssignTo: Employee;
  taskDescription?: Maybe<Scalars['String']['output']>;
  taskName: Scalars['String']['output'];
};

export enum Task_Progress_Status {
  Archived = 'ARCHIVED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Revision = 'REVISION',
  WorkDone = 'WORK_DONE'
}

export enum User_Role {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Employee = 'EMPLOYEE',
  Moderator = 'MODERATOR'
}

export type Unit = {
  __typename?: 'Unit';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  orgUID: Scalars['String']['output'];
  unitCode: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UnitListQueryInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type UnitPagination = {
  __typename?: 'UnitPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<Unit>>;
};

export type UpdateAdjustmentInput = {
  _id: Scalars['ID']['input'];
  account?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  balance?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expense?: InputMaybe<Scalars['String']['input']>;
  orgUID?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ActionType>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateAllOrderInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateAttendanceInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  attendee?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Attendance_Status>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  verifyBy?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBankAccountInput = {
  _id: Scalars['ID']['input'];
  balance?: InputMaybe<Scalars['Float']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  branch?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  holderName?: InputMaybe<Scalars['String']['input']>;
  orgUID?: InputMaybe<Scalars['String']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateBrandInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  logo?: InputMaybe<ServerFileInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  orgUID?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateEmployeeInput = {
  _id: Scalars['String']['input'];
  employeeDetails?: InputMaybe<Scalars['String']['input']>;
  organizations?: InputMaybe<Array<EmployeeOrganizationInput>>;
};

export type UpdateExpenseCalculationInput = {
  _id: Scalars['ID']['input'];
  amount?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  creator?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fromAccount?: InputMaybe<Scalars['String']['input']>;
  orgUID?: InputMaybe<Scalars['String']['input']>;
  statement?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateExpenseCategoryInput = {
  _id: Scalars['ID']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  orgUID?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateOrganizationInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  businessEmail?: InputMaybe<Scalars['String']['input']>;
  businessPhone?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<ServerFileInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  employees?: InputMaybe<Array<Scalars['String']['input']>>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orgUID?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  settings?: InputMaybe<OrganizationSettingsInput>;
  status?: InputMaybe<Organization_Status>;
  tagline?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateProductCategoryInput = {
  _id: Scalars['ID']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orgUID?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateProductInput = {
  _id: Scalars['ID']['input'];
  brand?: InputMaybe<Scalars['String']['input']>;
  carouselImages?: InputMaybe<Array<ServerFileInput>>;
  category?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  colors?: InputMaybe<Array<ColorInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Float']['input']>;
  gallery?: InputMaybe<Array<ServerFileInput>>;
  model?: InputMaybe<Scalars['String']['input']>;
  orgUID?: InputMaybe<Scalars['String']['input']>;
  regularPrice?: InputMaybe<Scalars['Float']['input']>;
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  sizes?: InputMaybe<Array<SizeInput>>;
  stock?: InputMaybe<Scalars['Float']['input']>;
  stockHistory?: InputMaybe<Array<StockHistoryInput>>;
  thumbnail?: InputMaybe<ServerFileInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateSavingInput = {
  _id: Scalars['ID']['input'];
  amount?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  orgUID?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateTaskManagementInput = {
  _id: Scalars['String']['input'];
  client?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deadLine?: InputMaybe<Scalars['DateTime']['input']>;
  dueAmount?: InputMaybe<Scalars['Int']['input']>;
  files?: InputMaybe<Array<ServerFileReferenceInput>>;
  paidBillAmount?: InputMaybe<Scalars['Int']['input']>;
  paymentStatus?: InputMaybe<Payment_Status>;
  progressStatus?: InputMaybe<Task_Progress_Status>;
  taskCreatedBy?: InputMaybe<Scalars['String']['input']>;
  taskDetails?: InputMaybe<TaskDetails>;
  taskId?: InputMaybe<Scalars['String']['input']>;
  totalBillAmount?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateUnitInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orgUID?: InputMaybe<Scalars['String']['input']>;
  unitCode?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateUserAndEmployeeRoleInput = {
  employee_id?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  /** User avatar */
  avatar?: InputMaybe<Scalars['String']['input']>;
  /** User email */
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  /** User role */
  role?: InputMaybe<User_Role>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role: User_Role;
};

export type UserListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type UserPagination = {
  __typename?: 'UserPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<User>>;
};

export type VerifyInviteMemberToOrganizationInput = {
  token: Scalars['String']['input'];
};

export type VerifyMagicLinkInput = {
  token: Scalars['String']['input'];
};

export enum Where_Operator {
  And = 'and',
  Or = 'or'
}
