export type UserDataType = {
  id: number;
  userName: string;
  password: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};



export type TodoType = {
  id: number;
  title: string;
  isComplete: boolean;
  createdAt:  Date;
  updatedAt: Date;
  remindAt?: Date;
  category?: CategoryType;
  categoryId?: number;
};

export type TodosFiltersType = {
  id?: number;
  title?: String;
  isComplete?: boolean;
  categoryId?: number;
  [key: string]: any;
};

export type CategoryType = {
  id: number;
  name: string;
  description: string;
  color: string;
  userId: number;
};
