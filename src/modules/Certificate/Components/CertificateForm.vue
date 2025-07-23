<template>
  <div
    v-if="store.showEdit && store.selected"
    class="fixed right-0 top-0 w-full max-w-md h-full glass-modal shadow-strong p-6 z-50 overflow-auto animate-slide-in-right"
    role="dialog"
    aria-modal="true"
    aria-labelledby="editCertificateTitle"
  >
    <div class="flex-between mb-4">
      <h2 id="editCertificateTitle" class="heading-secondary flex items-center gap-2">
        <Icon icon="mdi:certificate-outline" width="26" class="text-institutional" aria-hidden="true" />
        Editar Certificado
      </h2>
      <button
        type="button"
        class="btn-secondary-unas flex items-center gap-1"
        @click="close"
        aria-label="Cerrar edición"
      >
        <Icon icon="mdi:close" width="18" aria-hidden="true" />
        Cerrar
      </button>
    </div>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:account-outline" width="16" aria-hidden="true" />
          ID Persona
        </span>
        <input v-model.number="store.selected.personId" type="number" class="input-unas mt-1" required min="1" />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:map-marker-check-outline" width="16" aria-hidden="true" />
          ID Visita
        </span>
        <input v-model.number="store.selected.visitId" type="number" class="input-unas mt-1" required min="1" />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:identifier" width="16" aria-hidden="true" />
          Código Certificado
        </span>
        <input v-model="store.selected.certificateCode" class="input-unas mt-1" required />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:calendar-outline" width="16" aria-hidden="true" />
          Fecha de emisión
        </span>
        <input v-model="store.selected.issueDate" type="datetime-local" class="input-unas mt-1" required />
      </label>
      <label class="inline-flex items-center mt-2 mb-4 cursor-pointer">
        <input type="checkbox" v-model="store.selected.delivered" class="form-checkbox accent-[var(--unas-emerald-600)]" />
        <span class="ml-2 font-medium flex items-center gap-1">
          <Icon :icon="store.selected.delivered ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'" width="17" :class="store.selected.delivered ? 'text-green-700' : 'text-red-700'" aria-hidden="true" />
          ¿Entregado?
        </span>
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:note-outline" width="16" aria-hidden="true" />
          Descripción
        </span>
        <textarea v-model="store.selected.description" class="textarea-unas mt-1" />
      </label>
      <div class="mt-4 flex gap-2 flex-wrap">
        <button type="submit" class="btn-primary-unas flex items-center gap-2 hover-lift">
          <Icon icon="mdi:content-save-outline" width="18" aria-hidden="true" />
          Actualizar
        </button>
        <button type="button" class="btn-secondary-unas flex items-center gap-2" @click="close">
          <Icon icon="mdi:close" width="18" aria-hidden="true" />
          Cancelar
        </button>
        <button
          v-if="store.selected.delivered"
          type="button"
          class="btn-secondary-unas flex items-center gap-2"
          @click="downloadPdf"
          aria-label="Descargar PDF"
        >
          <Icon icon="mdi:file-pdf-box" width="18" class="text-red-700" aria-hidden="true" />
          Descargar PDF
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCertificateStore } from '../Store/certificateStore';
import { Icon } from '@iconify/vue';
import jsPDF from 'jspdf';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useCertificateStore();
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

   function downloadPdf() {
  const c = store.selected;
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  });

  // Fondo blanco, borde azul cielo futurista
  doc.setFillColor(241, 249, 255); // sky-50
  doc.rect(28, 28, 788, 536, 'F');
  doc.setDrawColor(56, 189, 248); // sky-400
  doc.setLineWidth(4);
  doc.rect(28, 28, 788, 536, 'S');

  // Título
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(44);
  doc.setTextColor(56, 189, 248); // sky-400
  doc.text('CERTIFICADO DE RECONOCIMIENTO', 414, 110, { align: 'center' });

  // Subtítulo FIIS-UNAS
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(16, 52, 134); // sky-900 (más oscuro)
  doc.text('Facultad de Ingeniería en Informática y Sistemas - UNAS', 414, 150, { align: 'center' });

  // Nombre del visitante (destacado)
  doc.setFont('times', 'italic');
  doc.setFontSize(32);
  doc.setTextColor(56, 189, 248);
  doc.text(c.nombre || 'Nombre Apellido', 414, 215, { align: 'center' });

  // Texto institucional de agradecimiento
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(17);
  doc.setTextColor(30, 41, 59); // slate-800
 doc.text(
  [
    'La Facultad de Ingeniería en Informática y Sistemas (FIIS) de la UNAS reconoce y agradece su valiosa visita.',
    '',
    'Su presencia y actitud positiva motivan a nuestra comunidad a superarse y fortalecer lazos de aprendizaje.',
    '',
    'Cada aporte suma a nuestro desarrollo profesional y humano.',
    c?.description
  ].join('\n'),
  414, 255, { align: 'center', maxWidth: 690 }
);

  // Datos del certificado
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text(`Código Certificado: ${c.certificateCode || ''}`, 120, 340);
  doc.text(`ID Persona: ${c.personId || ''}`, 120, 360);
  doc.text(`ID Visita: ${c.visitId || ''}`, 120, 380);

  // Descripción
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(56, 189, 248);

  // Fecha de emisión
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(56, 189, 248); // sky-400
  doc.text('Emitido en Tingo María, el', 120, 465);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59); // slate-800
  doc.text(formatDate(c.issueDate), 265, 465);

  // Estado entregado
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(21, 128, 61); // emerald-700
  if (c.delivered) {
    doc.text('CERTIFICADO ENTREGADO', 414, 490, { align: 'center' });
  } else {
    doc.setTextColor(239, 68, 68);
    doc.text('CERTIFICADO NO ENTREGADO', 414, 490, { align: 'center' });
  }

  // Firmas (puedes agregar imágenes con doc.addImage)
  doc.setDrawColor(183, 221, 251); // sky-200
  doc.line(160, 530, 340, 530);
  doc.line(610, 530, 790, 530);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text('Walter Bernuy Blanco', 250, 545, { align: 'center' });
  doc.text('Jorge Armando Moncada Solórzano', 700, 545, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.text('Decano FIIS', 250, 560, { align: 'center' });
  doc.text('Guia', 700, 560, { align: 'center' });

  doc.save(`certificado_${c.certificateCode || c.id}.pdf`);
}

function formatDate(dt) {
  if (!dt) return '';
  const [date] = dt.split('T');
  const [y, m, d] = date.split('-');
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  return `${d} de ${meses[parseInt(m) - 1]} del ${y}`;
}



    return { store, onSubmit, close, downloadPdf };
  }
});
</script>
