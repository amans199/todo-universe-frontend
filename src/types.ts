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


export enum SorterType {
  NONE = 0,
  ASC = 1,
  DESC = 2,
}

export type TodosFiltersType = {
  id?: number;
  title?: String;
  isComplete?: boolean;
  categoryId?: number;
  orderByTitle?: SorterType;
  orderByCreatedAt?: SorterType;
  orderByUpdatedAt?: SorterType;
  orderByRemindAt?: SorterType;
  [key: string]: any;
};

export type CategoryType = {
  id: number;
  name: string;
  description: string;
  color: string;
  userId: number;
};
