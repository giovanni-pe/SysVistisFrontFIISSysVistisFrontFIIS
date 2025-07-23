<template>
  <router-link
    :to="to"
    class="group flex items-center gap-3 p-3 my-1 rounded-xl text-slate-600 
           transition-all duration-300 ease-out
           hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 
           hover:text-white hover:shadow-lg hover:shadow-blue-500/30
           hover:scale-105 hover:translate-x-1
           relative overflow-hidden"
    active-class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/40 scale-105 translate-x-1"
  >
    <!-- Glow effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
    
    <!-- Icon with glow -->
    <div class="relative z-10 p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300">
      <Icon :icon="icon" width="20" class="drop-shadow-sm" />
    </div>
    
    <!-- Label with fade animation -->
    <span 
      v-if="!$parent.collapsed" 
      class="relative z-10 font-medium tracking-wide transition-all duration-300
             group-hover:drop-shadow-sm"
    >
      {{ label }}
    </span>
    
    <!-- Active indicator dot -->
    <div class="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 
                bg-gradient-to-b from-emerald-400 to-teal-500 rounded-r-full
                opacity-0 router-link-active:opacity-100 transition-opacity duration-300"></div>
  </router-link>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
defineProps<{ icon: string; to: string; label: string }>();
</script>