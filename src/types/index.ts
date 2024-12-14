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

export type DoctorForm = {
  id?: number;
  fio: string;
  depart: Department;
  headOfDepartment: boolean;
};

export type NurseForm = {
  id?: number;
  fio: string;
  depart: Department;
};
