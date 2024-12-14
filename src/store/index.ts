import Vuex from "vuex";
import PersonalModule from "./personal";

export const store = new Vuex.Store({
  modules: {
    PersonalModule,
  },
});
