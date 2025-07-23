<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col">
    <!-- Hero / Info FIIS -->
    <section class="container-unas py-12 flex flex-col items-center text-center gap-6">
      <img
        src="https://www.sistemasunas.edu.pe/sites/all/themes/business_responsive_theme/logo.png"
        alt="Logo UNAS"
        class="h-20 mb-4"
        loading="lazy"
      />
      <h1 class="text-4xl md:text-5xl font-black text-sky-700 mb-2 tracking-tight drop-shadow-lg">
        Reservas de Visitas FIIS - UNAS
      </h1>
      <p class="text-lg md:text-xl max-w-2xl text-slate-700 mb-2">
        Solicita tu visita académica, institucional o técnica a la <span class="text-sky-700 font-bold">Facultad de Ingeniería en Informática y Sistemas</span> (FIIS) de la UNAS y vive la experiencia de la innovación.
      </p>
      <div>
        <a href="#form-reserva" class="btn-primary-unas px-8 py-3 text-xl flex items-center gap-2 hover-lift">
          <Icon icon="mdi:calendar-plus" width="28" />
          Reservar Visita
        </a>
      </div>
    </section>

    <!-- Divider -->
    <div class="container-unas border-b border-sky-200 mb-12"></div>

    <!-- Formulario público de reserva -->
    <section id="form-reserva" class="container-unas py-12">
      <div class="max-w-xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-sky-100">
        <h2 class="text-2xl font-bold text-sky-700 mb-4 flex items-center gap-2">
          <Icon icon="mdi:clipboard-list-outline" width="26" />
          Formulario de Reserva
        </h2>
        <form @submit.prevent="onSubmit" class="space-y-6">
          <!-- Fecha de Solicitud -->
          <div class="form-group">
            <label class="form-label">
              <Icon icon="mdi:calendar" width="18" class="text-blue-600" />
              Fecha de Solicitud
            </label>
            <input
              v-model="form.requestDate"
              type="date"
              class="form-input"
              required
            />
          </div>
          <!-- Institución -->
          <div class="form-group">
            <label class="form-label">
              <Icon icon="mdi:domain" width="18" class="text-emerald-600" />
              Institución Solicitante
            </label>
            <input
              v-model="form.requestingInstitution"
              class="form-input"
              placeholder="Nombre de la institución..."
              required
            />
          </div>
          <!-- Personas Estimadas -->
          <div class="form-group">
            <label class="form-label">
              <Icon icon="mdi:account-group" width="18" class="text-purple-600" />
              Número de Personas
            </label>
            <input
              v-model.number="form.estimatedPeople"
              type="number"
              min="1"
              max="200"
              class="form-input"
              placeholder="Cantidad estimada..."
              required
            />
            <div class="form-hint">Cantidad estimada de visitantes</div>
          </div>
          <!-- Tipo de Visita - CARD SELECTOR -->
          <div class="form-group">
            <label class="form-label">
              <Icon icon="mdi:clipboard-list" width="18" class="text-orange-600" />
              Tipo de Visita
            </label>
            <div class="flex flex-wrap gap-4 mt-2">
              <div
                v-for="tipo in tiposVisita"
                :key="tipo.value"
                :class="[
                  'visit-type-card',
                  form.visitType === tipo.value ? 'visit-type-card--selected' : ''
                ]"
                @click="form.visitType = tipo.value"
                tabindex="0"
                @keydown.enter="form.visitType = tipo.value"
                role="button"
                :aria-pressed="form.visitType === tipo.value"
              >
                <Icon :icon="tipo.icon" width="32" class="mb-1" />
                <span class="font-bold text-base">{{ tipo.label }}</span>
                <span class="block text-xs text-slate-500 mt-1">{{ tipo.desc }}</span>
              </div>
            </div>
            <div v-if="!form.visitType && submitAttempted" class="text-red-600 mt-1 text-sm font-semibold">
              Por favor, selecciona un tipo de visita.
            </div>
          </div>
          <!-- Comentarios -->
          <div class="form-group">
            <label class="form-label">
              <Icon icon="mdi:comment-text" width="18" class="text-teal-600" />
              Observaciones y Comentarios
            </label>
            <textarea
              v-model="form.comments"
              class="form-input min-h-24"
              placeholder="Detalles adicionales sobre la visita..."
              rows="4"
            />
          </div>
          <!-- Botón -->
          <div class="pt-4">
            <button
              type="submit"
              class="btn-primary flex-1 w-full"
              :disabled="isSubmitting"
            >
              <Icon icon="mdi:send" width="20" />
              {{ isSubmitting ? 'Enviando...' : 'Solicitar Visita' }}
            </button>
            <div v-if="successMsg" class="mt-3 text-green-700 font-medium text-center animate-fade-in-up">
              <Icon icon="mdi:check-circle-outline" width="20" /> {{ successMsg }}
            </div>
            <div v-if="errorMsg" class="mt-3 text-red-700 font-medium text-center animate-fade-in-up">
              <Icon icon="mdi:alert-circle-outline" width="20" /> {{ errorMsg }}
            </div>
          </div>
        </form>
      </div>
    </section>
    <!-- Footer -->
    <footer class="py-6 text-center text-slate-500 text-sm border-t border-sky-200 mt-auto">
      <div>
        Facultad de Ingeniería en Informática y Sistemas – UNAS <br />
        <span class="text-sky-500">Tingo María, Perú</span> | plataforma de visitas © 2024
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useVisitRequestStore } from '../Store/visitRequestStore';
import { Icon } from '@iconify/vue';

const store = useVisitRequestStore();
const isSubmitting = ref(false);
const successMsg = ref('');
const errorMsg = ref('');
const submitAttempted = ref(false);

const tiposVisita = [
  {
    label: 'Académica',
    value: 'Académica',
    icon: 'mdi:school-outline',
    desc: 'Recorrido o actividad educativa.',
  },
  {
    label: 'Institucional',
    value: 'Institucional',
    icon: 'mdi:office-building-outline',
    desc: 'Visitas protocolares o de representación.',
  },
  {
    label: 'Técnica',
    value: 'Técnica',
    icon: 'mdi:tools',
    desc: 'Prácticas, laboratorios, o proyectos.',
  },
  {
    label: 'Investigación',
    value: 'Investigación',
    icon: 'mdi:flask-outline',
    desc: 'Trabajo científico o experimental.',
  },
  {
    label: 'Otro',
    value: 'Otro',
    icon: 'mdi:help-circle-outline',
    desc: 'Otra modalidad.',
  },
];

const form = ref({
  requestDate: '',
  requestingInstitution: '',
  estimatedPeople: 1,
  visitType: '',
  comments: '',
});

async function onSubmit() {
  submitAttempted.value = true;
  successMsg.value = '';
  errorMsg.value = '';
  if (!form.value.visitType) return; // Validación básica UX
  isSubmitting.value = true;
  try {
    await store.create(form.value);
    successMsg.value = '¡Solicitud enviada correctamente! Pronto nos comunicaremos desde FIIS-UNAS.';
    form.value = {
      requestDate: '',
      requestingInstitution: '',
      estimatedPeople: 1,
      visitType: '',
      comments: '',
    };
    submitAttempted.value = false;
  } catch (e) {
    errorMsg.value = 'Ocurrió un problema al registrar tu visita. Intenta nuevamente.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.form-group {
  @apply space-y-2;
}
.form-label {
  @apply flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2;
}
.form-input {
  @apply w-full px-4 py-3 border border-slate-200 rounded-xl 
         bg-white/80 backdrop-blur-sm
         focus:outline-none focus:ring-2 focus:ring-sky-500/40 
         focus:border-sky-500 
         transition-all duration-200
         hover:border-slate-300;
}
.form-hint {
  @apply text-xs text-slate-500 mt-1;
}
.btn-primary {
  @apply px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 
         text-white font-semibold rounded-xl shadow-lg
         hover:shadow-xl hover:scale-105 
         transition-all duration-200 ease-out
         disabled:opacity-50 disabled:cursor-not-allowed
         flex items-center justify-center gap-2;
}
.btn-primary-unas {
  @apply px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 
         text-white font-semibold rounded-xl shadow-lg
         hover:shadow-xl hover:scale-105 
         transition-all duration-200 ease-out
         disabled:opacity-50 disabled:cursor-not-allowed
         flex items-center justify-center gap-2;
}

.visit-type-card {
  @apply cursor-pointer flex flex-col items-center justify-center
         rounded-xl px-4 py-3 w-36 h-32 border-2 border-slate-100 bg-slate-50
         transition-all duration-150 select-none
         focus:outline-none focus:ring-2 focus:ring-sky-400/60
         hover:shadow-lg hover:border-sky-300;
}
.visit-type-card--selected {
  @apply border-2 border-sky-500 bg-sky-100 shadow-lg scale-105 ring-2 ring-sky-400/50;
}
</style>
