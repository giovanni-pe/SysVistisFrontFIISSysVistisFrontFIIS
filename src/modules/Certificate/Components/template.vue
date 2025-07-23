<template>
  <div
    class="cert-container"
    ref="certificate"
    style="background: #fff; padding: 2.5rem 3rem; width: 900px; height: 640px; border: 2px solid #1099b1; position: relative; font-family: 'Inter', serif;"
  >
    <!-- Esquinas decorativas -->
    <div class="cert-corner cert-corner-tl"></div>
    <div class="cert-corner cert-corner-tr"></div>
    <div class="cert-corner cert-corner-bl"></div>
    <div class="cert-corner cert-corner-br"></div>

    <!-- Logo UNAS, logo GINSOFT -->
    <div style="display: flex; align-items: center; justify-content: flex-start; gap: 1.8rem; margin-bottom: 1.2rem;">
      <img src="https://www.unas.edu.pe/sites/default/files/inline-images/logo_UNAS_2017.png" style="height: 54px" />
      <img src="https://ginstiunas.web.app/logoginsoft.png" style="height: 46px" />
    </div>

    <div style="text-align: right; margin-bottom: 0.3rem;">
      <span style="font-family: 'serif'; color: #1c88c9; font-size: 2.2rem; letter-spacing: 0.04em; font-weight: 700;">CERTIFICADO</span>
    </div>
    <div style="text-align: right; margin-bottom: 0.8rem;">
      <span style="font-size: 1.3rem; color: #666; font-weight: 700;">3<sup>er</sup> PUESTO</span>
    </div>
    <div style="text-align: right; margin-bottom: 1.5rem;">
      <span style="font-size: 1.05rem; color: #222;">CONCURSO DE PROGRAMACIÓN 2.0</span>
    </div>
    <!-- Nombre -->
    <div style="margin: 0.7rem 0 1.3rem 0;">
      <span style="display: inline-block; font-size: 2.2rem; color: #25a4e0; font-family: 'Dancing Script', cursive, serif; font-weight: bold; border-bottom: 2px solid #1099b1; letter-spacing: 0.05em; padding-bottom: 0.2em;">
        {{ nombreCompleto }}
      </span>
    </div>
    <!-- Texto motivo -->
    <div style="font-size: 1.1rem; color: #444; margin-bottom: 2.3rem; max-width: 730px;">
      Por motivo del XXIV aniversario de la Facultad de Ingeniería en Informática y Sistemas - UNAS. Organizado por el Grupo de Investigación en Ingeniería de Software, GINSOFT.
    </div>
    <!-- Fecha -->
    <div style="font-size: 1rem; color: #222; margin-bottom: 2.5rem;">
      {{ fecha | fechaCorta }}
    </div>
    <!-- Firmas -->
    <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-top: 1.5rem;">
      <div style="text-align: center; width: 260px;">
        <img src="https://i.imgur.com/TbzC9de.png" style="height: 46px; margin-bottom: -5px;" />
        <div style="font-size: 1.08rem; color: #298bbd; font-weight: bold; border-top: 1px solid #6ec3d8; margin-top: 0.2rem;">Marco Acuña Aguirre</div>
        <div style="font-size: 0.92rem; color: #333;">Decano FIIS</div>
      </div>
      <div style="text-align: center; width: 260px;">
        <img src="https://i.imgur.com/C4J6hW3.png" style="height: 46px; margin-bottom: -5px;" />
        <div style="font-size: 1.08rem; color: #298bbd; font-weight: bold; border-top: 1px solid #6ec3d8; margin-top: 0.2rem;">Rondy Juarez Zapata</div>
        <div style="font-size: 0.92rem; color: #333;">Coordinador GINSOFT</div>
      </div>
    </div>
    <!-- Fondo geométrico decorativo -->
    <div class="cert-fondo-geo"></div>
  </div>
</template>

<script>
export default {
  name: "CertificadoUnasGinsoft",
  props: {
    nombreCompleto: {
      type: String,
      default: "Perez Espinoza, Giovanni A.",
    },
    fecha: {
      type: String,
      default: "2023-09-04",
    },
  },
  filters: {
    fechaCorta(val) {
      // 2023-09-04 => 04 de Septiembre del 2023
      if (!val) return "";
      const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ];
      const [y, m, d] = val.split("-");
      return `${d} de ${meses[parseInt(m) - 1]} del ${y}`;
    }
  }
}
</script>

<style scoped>
.cert-corner {
  position: absolute;
  width: 42px; height: 42px; border: 5px solid #1099b1; border-radius: 3px;
}
.cert-corner-tl { left: 0; top: 0; border-right: none; border-bottom: none; }
.cert-corner-tr { right: 0; top: 0; border-left: none; border-bottom: none; }
.cert-corner-bl { left: 0; bottom: 0; border-right: none; border-top: none; }
.cert-corner-br { right: 0; bottom: 0; border-left: none; border-top: none; }
.cert-fondo-geo {
  position: absolute; right: 40px; top: 40px; opacity: 0.08;
  width: 260px; height: 180px;
  background-image: url('https://i.imgur.com/vcrv6bb.png');
  background-size: contain; background-repeat: no-repeat;
  z-index: 0;
}
.cert-container {
  box-shadow: 0 2px 16px 2px rgba(16,153,177,.12);
}
</style>
