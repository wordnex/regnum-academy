/**
 * ============================================
 *   REGNUM ACADEMY — ARCHIVO DE CONFIGURACIÓN
 *   Edita solo este archivo para actualizar
 *   toda la información de la página.
 * ============================================
 */

const CONFIG = {

  // --- ACADEMIA ---
  nombre:       "REGNUM ACADEMY",
  slogan:       "Disciplina. Fuerza. Carácter.",
  ubicacion:    "Cochabamba, Bolivia",
  whatsapp:     "59165736908",   // Sin + ni espacios

  // --- HERO ---
  hero: {
    titulo_1:   "Forma tu cuerpo.",
    titulo_2:   "Fortalece tu mente.",
    titulo_3:   "Supera tus límites.",
    subtitulo:  "Entrena con disciplina, mejora tu condición física y aprende verdaderas artes marciales en REGNUM ACADEMY.",
    stat_1_num: "100+",  stat_1_label: "Alumnos",
    stat_2_num: "5",     stat_2_label: "Disciplinas",
    stat_3_num: "Flex",  stat_3_label: "Horarios",
    stat_4_num: "Pro",   stat_4_label: "Ambiente",
  },

  // --- PRECIOS ---
  precios: [
    {
      nombre:    "Sesión",
      monto:     "20",
      moneda:    "Bs",
      desc:      "Prueba una clase sin compromiso.",
      features:  ["1 clase de cualquier disciplina", "Sin inscripción previa", "Acceso al tatami"],
      destacado: false,
      msg_wa:    "Hola, quiero una sesión de prueba",
    },
    {
      nombre:    "Mensualidad",
      monto:     "200",
      moneda:    "Bs",
      desc:      "El plan que transforma vidas.",
      features:  ["Acceso ilimitado todo el mes", "Todas las disciplinas", "Seguimiento personalizado", "Comunidad de alumnos"],
      destacado: true,
      msg_wa:    "Hola, quiero la mensualidad",
    },
    {
      nombre:    "Medio Mes",
      monto:     "150",
      moneda:    "Bs",
      desc:      "Flexibilidad para comenzar cuando quieras.",
      features:  ["2 semanas de entrenamiento", "Todas las disciplinas", "Horarios flexibles"],
      destacado: false,
      msg_wa:    "Hola, quiero el plan de medio mes",
    },
  ],

  // --- HORARIOS ---
  horarios: [
    {
      disciplina: "Kick Boxing",
      turnos: [
        "10:00 – 11:30 AM",
        "15:00 – 16:30 PM",
        "16:30 – 17:30 PM",
        "18:00 – 19:00 PM",
        "19:00 – 20:30 PM",
      ],
    },
    {
      disciplina: "Boxeo",
      turnos: [
        "6:30 – 7:30 AM (Lun, Mié y Vie)",
        "7:30 – 8:30 AM",
        "20:30 – 22:00 PM",
      ],
    },
    {
      disciplina: "Sambo",
      turnos: ["15:30 – 17:00 PM"],
    },
    {
      disciplina: "Jiu Jitsu",
      turnos: ["17:00 – 18:30 PM"],
    },
    {
      disciplina: "Grappling",
      turnos: ["10:30 – 11:30 AM"],
      nota: "Lucha — Jiu Jitsu — Luta Livre",
    },
  ],

  // --- TESTIMONIOS ---
  testimonios: [
    {
      nombre:     "Carlos M.",
      disciplina: "Kick Boxing · 6 meses",
      texto:      "Excelente ambiente para entrenar. Desde el primer día me sentí parte del equipo. Los profesores son muy profesionales.",
    },
    {
      nombre:     "Andrea V.",
      disciplina: "Jiu Jitsu · 1 año",
      texto:      "Los profesores realmente enseñan. No solo te ponen a sparrear — hay técnica, metodología y progresión real.",
    },
    {
      nombre:     "Roberto S.",
      disciplina: "Boxeo · 8 meses",
      texto:      "Mi condición física cambió completamente. Bajé de peso, gané músculo y me siento con más energía que a los 20.",
    },
  ],

  // --- REDES SOCIALES (dejar vacío "" si no tiene) ---
  redes: {
    whatsapp:  "https://wa.me/59165736908",
    instagram: "https://www.instagram.com/regnum__academy_",
    tiktok:    "",
    facebook:  "",
  },

  // --- MAPA (coordenadas de Google Maps embed) ---
  mapa_embed: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3784.4!2d-66.170694!3d-17.377500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDIyJzM5LjAiUyA2NsKwMTAnMTQuNSJX!5e0!3m2!1ses!2sbo!4v1700000000000",
  mapa_link:  "https://maps.app.goo.gl/mNWxDghACgLKJ5ee7?g_st=ic",

};
