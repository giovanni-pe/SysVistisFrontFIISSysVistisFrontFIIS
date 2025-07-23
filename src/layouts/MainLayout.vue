<template>
  <div class="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Sidebar -->
    <Sidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />
    
    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <HeaderBar @toggleSidebar="toggleSidebar" />
      <!-- Page content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="max-w-7xl mx-auto">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import HeaderBar from '@/components/HeaderBar.vue';

const sidebarCollapsed = ref(false);
function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value;
}
</script>