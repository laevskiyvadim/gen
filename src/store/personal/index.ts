import { VuexModule, Module, config, Mutation } from "vuex-module-decorators";
import { Doctor, Nurse, BaseUser } from "@/types";
import { IPersonalState } from "./index.interface";
import json from "@/mock-data/personal.json";
config.rawError = true;

function isDoctor(obj: Omit<BaseUser, "id"> | BaseUser): obj is Doctor {
  return obj && "headOfDepartment" in obj;
}

function clearHeadOfDepartInDepartment(
  staff: (Doctor | Nurse)[],
  person: Omit<Doctor | Nurse, "id">
) {
  if (isDoctor(person) && person.headOfDepartment) {
    return staff.map((v: Nurse | Doctor) => {
      if (isDoctor(v) && v.depart == person.depart) v.headOfDepartment = false;
      return v;
    });
  }
  return staff;
}

@Module({
  namespaced: true,
  name: "personal",
  stateFactory: true,
})
export default class PersonalModule
  extends VuexModule
  implements IPersonalState
{
  staff = json as (Nurse | Doctor)[];
  currentEditPerson = {} as BaseUser;
  id = json.length;

  @Mutation
  addPerson(person: Omit<Doctor | Nurse, "id">): void {
    this.staff = clearHeadOfDepartInDepartment(this.staff, person);
    this.staff.push({ ...person, id: ++this.id });
  }

  @Mutation
  setCurrentEditPerson(id: number): void {
    const foundUser = this.staff.find((user) => user.id === id);
    this.currentEditPerson = foundUser ? foundUser : ({} as BaseUser);
  }

  @Mutation
  clearCurrentEditPerson() {
    this.currentEditPerson = {} as BaseUser;
  }

  @Mutation
  editPerson(person: Doctor | Nurse): void {
    this.staff = clearHeadOfDepartInDepartment(this.staff, person);
    this.staff = this.staff.map((el) => {
      return el.id === person.id ? person : el;
    });
  }

  @Mutation
  removePerson(id: number) {
    this.staff = this.staff.filter((el) => el.id !== id);
  }

  get getCurrentEditPerson() {
    return { ...this.currentEditPerson };
  }

  get getDoctors() {
    return this.staff.filter(isDoctor);
  }

  get getNurses() {
    return this.staff.filter((el): el is Nurse => !isDoctor(el));
  }
}
