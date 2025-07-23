<template>
  <div
    v-if="store.showEdit && store.selected"
    class="fixed right-0 top-0 w-full max-w-md h-full glass-modal shadow-strong p-6 z-50 overflow-auto animate-slide-in-right"
    role="dialog"
    aria-modal="true"
    aria-labelledby="editGuideTitle"
  >
    <div class="flex-between mb-4">
      <h2 id="editGuideTitle" class="heading-secondary flex items-center gap-2">
        <Icon icon="mdi:account-box-edit-outline" width="28" class="text-institutional" aria-hidden="true" />
        Editar Guía
      </h2>
      <button
        type="button"
        class="btn-secondary-unas flex items-center gap-1"
        @click="close"
        aria-label="Cerrar edición"
      >
        <Icon icon="mdi:close" width="20" aria-hidden="true" />
        Cerrar
      </button>
    </div>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:account-outline" width="18" aria-hidden="true" />
          Nombre Completo
        </span>
        <input v-model="store.selected.fullName" class="input-unas mt-1" required />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:email-outline" width="18" aria-hidden="true" />
          Email
        </span>
        <input v-model="store.selected.email" type="email" class="input-unas mt-1" required />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:phone-outline" width="18" aria-hidden="true" />
          Teléfono
        </span>
        <input v-model="store.selected.phone" class="input-unas mt-1" required maxlength="15" />
      </label>
      <div class="mt-4 flex gap-2">
        <button type="submit" class="btn-primary-unas flex items-center gap-2 hover-lift">
          <Icon icon="mdi:content-save-outline" width="20" aria-hidden="true" />
          Actualizar
        </button>
        <button type="button" class="btn-secondary-unas flex items-center gap-2" @click="close">
          <Icon icon="mdi:close" width="20" aria-hidden="true" />
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useGuideStore } from '../Store/guideStore';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useGuideStore();
    function close() {
      store.showEdit = false;
      store.clearSelected();
    }
    async function onSubmit() {
      if (store.selected?.id) {
        await store.update(store.selected.id, store.selected);
        close();
      }
    }
    return { store, onSubmit, close };
  }
});
</script>
