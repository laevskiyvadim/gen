<template>
  <h1 class="va-h1">Doctors</h1>
  <BButton variant="success" @click="showModal = !showModal">
    Add record
  </BButton>
  <BContainer class="py-5">
    <BTableSimple v-if="doctors.length">
      <BThead head-variant="dark">
        <BTr>
          <BTh v-for="head of headersOfTable" :key="head">{{ head }}</BTh>
          <BTh>Actions</BTh>
        </BTr>
      </BThead>
      <BTbody>
        <BTr v-for="doctor of doctors" :key="doctor.id">
          <BTh>{{ doctor.id }}</BTh>
          <BTh>{{ doctor.fio }}</BTh>
          <BTh>{{ doctor.depart }}</BTh>
          <BTh>
            <BFormCheckbox
              v-model="doctor.headOfDepartment"
              disabled
            ></BFormCheckbox>
          </BTh>
          <BTh>
            <BButtonGroup>
              <BButton variant="warning" @click="setCurrentPerson(doctor.id)">
                Edit
              </BButton>
              <BButton variant="danger" @click="removePerson(doctor.id)">
                Delete
              </BButton>
            </BButtonGroup>
          </BTh>
        </BTr>
      </BTbody>
    </BTableSimple>
  </BContainer>
  <BModal
    v-model="showModal"
    @cancel="clearPerson"
    @ok="beforeOk"
    :title="titleForModalWindow"
  >
    <BForm v-if="showModal">
      <BFormGroup id="input-group-2" label="Your Name:" label-for="input-2">
        <BFormInput
          id="input-2"
          v-model="form.fio"
          placeholder="Enter name"
          required
        />
      </BFormGroup>
      <BFormGroup id="input-group-3" label="Food:" label-for="input-3">
        <BFormSelect
          id="input-3"
          v-model="form.depart"
          :options="departaments"
          required
        />
      </BFormGroup>
      <BFormGroup
        id="input-group-3"
        label="Head of department:"
        label-for="input-4"
      >
        <BFormCheckbox
          v-model="form.headOfDepartment"
          id="input-4"
        ></BFormCheckbox>
      </BFormGroup>
    </BForm>
  </BModal>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Mutation, Getter } from "vuex-class";
import { Department, Doctor, DoctorForm } from "@/types";
import {
  BButton,
  BContainer,
  BTableSimple,
  BThead,
  BTh,
  BTr,
  BTbody,
  BButtonGroup,
  BFormCheckbox,
  BModal,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
} from "bootstrap-vue-next";

@Options({
  components: {
    BButton,
    BContainer,
    BTableSimple,
    BThead,
    BTh,
    BTr,
    BTbody,
    BButtonGroup,
    BFormCheckbox,
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
  },
})
export default class DoctorView extends Vue {
  @Mutation("PersonalModule/removePerson") removePerson!: (id: number) => void;
  @Mutation("PersonalModule/addPerson") addPerson!: (
    v: Omit<Doctor, "id">
  ) => void;
  @Mutation("PersonalModule/editPerson") editPerson!: (
    v: Omit<Doctor, "id">
  ) => void;
  @Mutation("PersonalModule/setCurrentEditPerson") setCurrentEditPerson!: (
    id: number
  ) => void;
  @Mutation("PersonalModule/clearCurrentEditPerson")
  clearCurrentEditPerson!: () => void;
  @Getter("PersonalModule/getDoctors") readonly doctors!: Doctor[];
  @Getter("PersonalModule/getCurrentEditPerson")
  readonly getCurrentEditPerson!: Doctor;

  showModal = false;
  form: DoctorForm = {
    fio: "",
    depart: null as Department,
    headOfDepartment: false,
  };
  departaments: Department[] = [Department.cardiology, Department.surgical];

  beforeOk() {
    return this.form?.id ? this.editedPerson() : this.savePerson();
  }

  clearPerson() {
    this.showModal = false;
    this.form = {
      fio: "",
      depart: null as Department,
      headOfDepartment: false,
    };
    this.clearCurrentEditPerson();
  }

  editedPerson() {
    this.editPerson({ ...this.form });
    this.showModal = false;
    this.clearPerson();
  }

  setCurrentPerson(id: number): void {
    this.setCurrentEditPerson(id);
    this.form = { ...this.getCurrentEditPerson };
    this.showModal = true;
  }

  savePerson() {
    this.addPerson({ ...this.form });
    this.clearPerson();
  }

  get titleForModalWindow() {
    return Object.keys(this.getCurrentEditPerson).length ? "Edit" : "Add";
  }

  get headersOfTable(): string[] {
    for (const doctor of this.doctors) {
      return Object.keys(doctor);
    }
    return [];
  }
}
</script>
<style></style>
