<template>
  <v-app>
    <nav-sidebar />

    <app-header />

    <div class="app-body">
      <main class="main">
        <v-content>
          <v-container fluid fill-height>
            <router-view></router-view>
          </v-container>
        </v-content>
      </main>
      <!-- AppAside/ -->
    </div>

    <app-footer />
  </v-app>
</template>

<script>
import { AppHeader, AppFooter, NavSidebar } from '@/components/'

export default {
  name: 'full',
  components: {
    AppHeader,
    AppFooter,
    NavSidebar
  }
}
</script>
