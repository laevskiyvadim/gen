import { Doctor, Nurse } from "@/types";

export interface IPersonalState {
  staff: (Doctor | Nurse)[];
  currentEditPerson: Doctor | Nurse;
  id: number;

  editPerson(person: Doctor | Nurse): void;
  removePerson(id: number): void;
  readonly getDoctors: Doctor[];
  readonly getNurses: Nurse[];
  readonly getCurrentEditPerson: Doctor | Nurse;
}
