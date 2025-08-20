// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // 👈 importante para Angular
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",     // Azul oscuro
        secondary: "#60A5FA",   // Azul claro
        success: "#10B981",     // Verde esmeralda
        error: "#EF4444",       // Rojo
        warning: "#F59E0B",     // Amarillo dorado
        info: "#3B82F6",        // Azul cielo
        neutral: {
          50: "#F9FAFB",        // Fondo muy claro
          100: "#F3F4F6",
          200: "#E5E7EB",       // Fondo gris medio
          300: "#D1D5DB",       // Bordes
          600: "#6B7280",       // Texto secundario
          900: "#111827",       // Texto principal
        },
      },
    },
  },
  plugins: [],
}