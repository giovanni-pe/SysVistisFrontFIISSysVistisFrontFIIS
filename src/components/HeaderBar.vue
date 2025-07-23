<template>
  <header class="bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-900/5 
                 flex items-center px-6 h-18 border-b border-white/20 relative z-20">
    
    <!-- Mobile Menu Toggle -->
    <button
      class="mr-4 lg:hidden p-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600
             text-white shadow-md hover:shadow-lg hover:scale-105 
             transition-all duration-200 ease-out"
      @click="$emit('toggleSidebar')"
      aria-label="Toggle sidebar"
    >
      <Icon icon="mdi:menu" width="24" />
    </button>

    <!-- Title Section -->
    <div class="flex-1 flex items-center gap-4">
      <div class="flex flex-col">
        <h1 class="font-bold text-xl text-slate-800 tracking-wide">
          Sistema de Visitas
        </h1>
        <p class="text-sm text-slate-500 font-medium">
          Facultad de Ingeniería en Informática y Sistemas
        </p>
      </div>
    </div>

    <!-- Right Section -->
    <div class="flex items-center gap-4">
      
      <!-- Search Bar (hidden on mobile) -->
      <div class="hidden md:flex items-center relative">
        <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon icon="mdi:magnify" width="18" class="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar..."
          class="pl-10 pr-4 py-2 w-64 bg-slate-50/50 border border-slate-200 
                 rounded-xl text-sm placeholder-slate-400
                 focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                 focus:border-blue-500 transition-all duration-200"
        />
      </div>

      <!-- Quick Actions -->
      <div class="flex items-center gap-2">
        <!-- Notifications -->
        <button class="relative p-2 rounded-xl bg-slate-50 hover:bg-slate-100
                       transition-colors duration-200 group">
          <Icon icon="mdi:bell-outline" width="20" class="text-slate-600 group-hover:text-blue-600" />
          <span 
            v-if="notifCount" 
            class="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 
                   text-white text-xs rounded-full w-5 h-5 flex items-center justify-center
                   shadow-lg animate-pulse"
          >
            {{ notifCount }}
          </span>
          <!-- Notification dot animation -->
          <div v-if="notifCount" 
               class="absolute -top-1 -right-1 w-5 h-5 bg-red-400 rounded-full 
                      animate-ping opacity-75"></div>
        </button>

        <!-- Settings -->
        <button class="p-2 rounded-xl bg-slate-50 hover:bg-slate-100
                       transition-colors duration-200 group">
          <Icon icon="mdi:cog-outline" width="20" class="text-slate-600 group-hover:text-blue-600" />
        </button>
      </div>

      <!-- User Section -->
      <div class="flex items-center">
        <div v-if="auth.isAuthenticated" class="flex items-center gap-3">
          <!-- User Avatar -->
          <div class="relative">
            <div class="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 
                        rounded-full flex items-center justify-center shadow-lg">
              <Icon icon="mdi:account" width="20" class="text-white" />
            </div>
            <!-- Online status indicator -->
            <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 
                        rounded-full border-2 border-white"></div>
          </div>
          
          <!-- User Info (hidden on small screens) -->
          <div class="hidden sm:flex flex-col">
            <span class="text-sm font-semibold text-slate-700">
              {{ auth.user?.name || 'Usuario' }}
            </span>
            <span class="text-xs text-slate-500">
              {{ auth.user?.email }}
            </span>
          </div>

          <!-- Logout Button -->
          <button 
            class="ml-2 px-4 py-2 text-sm font-medium text-slate-600 
                   border border-slate-200 rounded-xl hover:bg-slate-50
                   hover:border-red-300 hover:text-red-600
                   transition-all duration-200 ease-out"
            @click="logout"
          >
            <Icon icon="mdi:logout" width="16" class="mr-1" />
            <span class="hidden sm:inline">Salir</span>
          </button>
        </div>

        <!-- Login Button -->
        <router-link 
          v-else 
          to="/login" 
          class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 
                 text-white text-sm font-semibold rounded-xl shadow-lg
                 hover:shadow-xl hover:scale-105 
                 transition-all duration-200 ease-out"
        >
          <Icon icon="mdi:login" width="16" class="mr-2" />
          Iniciar Sesión
        </router-link>
      </div>
    </div>

    <!-- Decorative gradient line -->
    <div class="absolute bottom-0 left-0 right-0 h-px 
                bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
  </header>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/modules/Auth/Store/authStore';
const auth = useAuthStore();

const notifCount = 3; // Conectar a store de notificaciones

function logout() {
  auth.logout();
  window.location.reload();
}
</script>