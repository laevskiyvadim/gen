export enum Department {
  cardiology = "cardiology",
  surgical = "surgical",
}

export type BaseUser = {
  id: number;
  fio: string;
  depart: Department;
};

export type Doctor = BaseUser & {
  headOfDepartment: boolean;
};

export type Nurse = BaseUser;

export type BaseForm = {
  id?: number;
  fio: string;
  depart: Department;
};

export type DoctorForm = BaseForm & {
  headOfDepartment: boolean;
};

export type NurseForm = BaseForm;
