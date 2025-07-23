<template>
  <aside
    :class="[
      'bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-900/10 z-30 flex flex-col',
      'transition-all duration-300 ease-out border-r border-white/20',
      collapsed ? 'w-20' : 'w-72',
      'h-full fixed lg:relative',
      collapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'
    ]"
  >
    <!-- Logo/Header Section -->
    <div class="h-20 flex items-center justify-center border-b border-slate-200/50 bg-gradient-to-r from-emerald-600 to-teal-700 relative overflow-hidden">
      <!-- Animated background -->
      <div class="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 animate-pulse"></div>
      
      <div class="relative z-10 flex items-center gap-3 text-white">
        <div class="relative">
          <!-- Glow effect for icon -->
          <div class="absolute inset-0 bg-white/30 rounded-full blur-sm"></div>
          <Icon icon="mdi:school" width="36" class="relative z-10 drop-shadow-lg" />
        </div>
        
        <div v-if="!collapsed" class="flex flex-col">
          <span class="font-bold text-lg tracking-wide drop-shadow-sm">SysVisits</span>
          <span class="text-xs text-emerald-100 font-medium">FIIS - UNAS</span>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-4 py-6 space-y-2 bg-gradient-to-b from-white/90 to-slate-50/90">
      <!-- Section: Gestión de Visitas -->
      <div v-if="!collapsed" class="mb-4">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Gestión de Visitas
        </h3>
      </div>
      
      <SidebarLink 
        icon="fluent:document-question-mark-20-filled" 
        to="/visit-requests" 
        label="Solicitudes de Visita" 
      />
      <SidebarLink 
        icon="fluent:people-20-filled" 
        to="/visit-persons" 
        label="Registro de Personas" 
      />
      <SidebarLink 
        icon="fluent:clipboard-checkmark-20-filled" 
        to="/receptions" 
        label="Control de Recepciones" 
      />

      <!-- Divider -->
      <div class="my-6 border-t border-slate-200/50"></div>

      <!-- Section: Certificación y Guías -->
      <div v-if="!collapsed" class="mb-4">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Certificación
        </h3>
      </div>
      
      <SidebarLink 
        icon="fluent:certificate-20-filled" 
        to="/certificates" 
        label="Certificados Digitales" 
      />
      <SidebarLink 
        icon="fluent:person-star-20-filled" 
        to="/guides" 
        label="Guías Especializados" 
      />
      <SidebarLink 
        icon="fluent:person-sync-20-filled" 
        to="/guide-assignments" 
        label="Asignación de Guías" 
      />

      <!-- Divider -->
      <div class="my-6 border-t border-slate-200/50"></div>

      <!-- Section: Reportes -->
      <div v-if="!collapsed" class="mb-4">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Reportes
        </h3>
      </div>
      
      <SidebarLink 
        icon="fluent:history-20-filled" 
        to="/historic" 
        label="Historial Completo" 
      />
    </nav>

    <!-- Footer Info -->
    <div v-if="!collapsed" class="p-4 border-t border-slate-200/50 bg-gradient-to-r from-slate-50 to-blue-50">
      <div class="text-center">
        <div class="text-xs text-slate-600 font-medium mb-1">
          Facultad de Ingeniería
        </div>
        <div class="text-xs text-slate-500">
          Informática y Sistemas
        </div>
        <div class="text-xs text-emerald-600 font-semibold mt-1">
          UNAS - 2025
        </div>
      </div>
    </div>

    <!-- Mobile Close Button -->
    <button
      class="absolute top-4 right-4 lg:hidden p-2 rounded-full 
             bg-white/20 backdrop-blur-sm text-white
             hover:bg-white/30 transition-colors duration-200"
      @click="$emit('toggle')"
      aria-label="Cerrar menú"
    >
      <Icon icon="mdi:close" width="20" />
    </button>

    <!-- Collapse Toggle for Desktop -->
    <button
      v-if="!collapsed"
      class="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2
             w-6 h-6 bg-white rounded-full shadow-md border border-slate-200
             hover:bg-slate-50 transition-colors duration-200 z-40"
      @click="$emit('toggle')"
      aria-label="Colapsar menú"
    >
      <Icon icon="mdi:chevron-left" width="16" class="text-slate-600" />
    </button>
  </aside>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import SidebarLink from './SidebarLink.vue';
defineProps<{ collapsed: boolean }>();
</script>