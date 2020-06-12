<template>
  <v-app>
    <Nav />
    <v-content>
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Footer from './components/Footer.vue'
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: { Nav, Footer }
};
</script>
