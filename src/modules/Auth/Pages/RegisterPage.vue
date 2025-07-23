<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <form @submit.prevent="onRegister" class="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-6">
      <h2 class="text-2xl font-bold text-center mb-2">Crear Cuenta</h2>
      <div class="relative">
        <Icon icon="mdi:email" class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" width="20" />
        <input
          v-model="email"
          id="email"
          type="email"
          required
          class="input input-bordered w-full pl-8"
          placeholder="Email"
        />
      </div>
      <div class="relative">
        <Icon icon="tabler:lock" class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" width="20" />
        <input
          v-model="password"
          id="password"
          type="password"
          required
          class="input input-bordered w-full pl-8"
          placeholder="Contraseña"
        />
      </div>
      <div v-if="auth.registerError" class="text-red-500 text-sm">{{ auth.registerError }}</div>
      <div v-if="auth.registerSuccess" class="text-green-600 text-sm">
        <Icon icon="mdi:check-circle-outline" class="inline align-middle mr-1" width="20"/>
        ¡Registro exitoso! Ahora puedes
        <router-link to="/login" class="underline">iniciar sesión</router-link>.
      </div>
      <button type="submit" :disabled="auth.loading" class="btn btn-primary w-full flex items-center justify-center gap-2">
        <Icon v-if="auth.loading" icon="svg-spinners:180-ring-with-bg" width="20"/>
        <span>{{ auth.loading ? "Registrando..." : "Registrarse" }}</span>
      </button>
      <router-link
        to="/login"
        class="block mt-2 text-center text-blue-500 hover:underline"
      >
        ¿Ya tienes cuenta? Inicia sesión
      </router-link>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useAuthStore } from '../Store/authStore';

const auth = useAuthStore();
let email = '';
let password = '';

async function onRegister() {
  await auth.register({ email, password });
}
</script>
