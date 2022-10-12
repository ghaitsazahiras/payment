<template>
  <div>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        <!-- Menu -->
        <sidebar />
        <!-- / Menu -->

        <!-- Layout container -->
        <div class="layout-page">
          <!-- Navbar -->
          <Navbar />
          <!-- / Navbar -->

          <!-- Content wrapper -->
          <div class="container" style="margin:30px auto">
            <router-view />
            <Footer />
            <div class="content-backdrop fade"></div>
          </div>
          <!-- Content wrapper -->
        </div>
        <!-- / Layout page -->
      </div>

      <!-- Overlay -->
      <div class="layout-overlay layout-menu-toggle"></div>
    </div>
    <!-- / Layout wrapper -->
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from './components/Sidebar.vue';

export default {
    name: 'App',
    components: {
      Footer, Navbar, Sidebar
    }
}
</script>