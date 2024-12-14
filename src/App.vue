<template>
  <BNavbar toggleable="lg" variant="primary">
    <BNavbarBrand href="#">NavBar</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav>
        <router-link to="/doctors"> Doctors </router-link>
        <router-link to="/nurses"> Nurses </router-link>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
  <router-view />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  BNavbar,
  BCollapse,
  BNavbarBrand,
  BNavbarNav,
  BNavbarToggle,
  BNavItem,
} from "bootstrap-vue-next";

@Options({
  components: {
    BNavbar,
    BCollapse,
    BNavbarBrand,
    BNavbarNav,
    BNavbarToggle,
    BNavItem,
  },
})
export default class AppLayer extends Vue {
  menu = [
    { icon: "\ue914", title: "Doctors", to: "/doctors" },
    { icon: "\ue934", title: "Nurses", to: "/nurses" },
  ];
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.navbar-nav {
  gap: 20px;
}
</style>
