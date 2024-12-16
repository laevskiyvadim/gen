<template>
  <h1 class="va-h1">Nurses</h1>
  <BButton variant="success" @click="showModal = !showModal">
    Add record
  </BButton>
  <BContainer class="py-5">
    <BTableSimple v-if="nurses.length">
      <BThead head-variant="dark">
        <BTr>
          <BTh v-for="head of headersOfTable" :key="head">{{ head }}</BTh>
          <BTh>Actions</BTh>
        </BTr>
      </BThead>
      <BTbody>
        <BTr v-for="nurse of nurses" :key="nurse.id">
          <BTh>{{ nurse.id }}</BTh>
          <BTh>{{ nurse.fio }}</BTh>
          <BTh>{{ nurse.depart }}</BTh>
          <BTh>
            <BButtonGroup>
              <BButton variant="warning" @click="setCurrentPerson(nurse.id)">
                Edit
              </BButton>
              <BButton variant="danger" @click="removePerson(nurse.id)">
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
    </BForm>
  </BModal>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Mutation, Getter } from "vuex-class";
import { Nurse, NurseForm, Department } from "@/types";
import {
  BButton,
  BContainer,
  BTableSimple,
  BThead,
  BTh,
  BTr,
  BTbody,
  BButtonGroup,
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
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
  },
})
export default class NursesView extends Vue {
  @Mutation("PersonalModule/removePerson") removePerson!: (id: number) => void;
  @Mutation("PersonalModule/addPerson") addPerson!: (
    v: Omit<Nurse, "id">
  ) => void;
  @Mutation("PersonalModule/editPerson") editPerson!: (
    v: Omit<Nurse, "id">
  ) => void;
  @Mutation("PersonalModule/setCurrentEditPerson") setCurrentEditPerson!: (
    id: number
  ) => void;
  @Mutation("PersonalModule/clearCurrentEditPerson")
  clearCurrentEditPerson!: () => void;
  @Getter("PersonalModule/getNurses") readonly nurses!: Nurse[];
  @Getter("PersonalModule/getCurrentEditPerson")
  readonly getCurrentEditPerson!: Nurse;

  showModal = false;
  form: NurseForm = {
    fio: "",
    depart: null as Department,
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
    };
    this.clearCurrentEditPerson();
  }

  savePerson() {
    this.addPerson({ ...this.form });
    this.clearPerson();
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

  get titleForModalWindow() {
    return Object.keys(this.getCurrentEditPerson).length ? "Edit" : "Add";
  }

  get headersOfTable(): string[] {
    for (const nurse of this.nurses) {
      return Object.keys(nurse);
    }
    return [];
  }
}
</script>
