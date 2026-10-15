# DentalCare - Sistema de Gestión Dental

Aplicación web frontend moderna para la gestión y administración odontológica, desarrollada con arquitectura modular e interfaces independientes.

## 🚀 Características

- **Pantalla de Inicio de Sesión (`index.html`)**:
  - Validación de credenciales de usuario con protección contra contraseñas incorrectas.
  - Alerta visual con animación *shake* en caso de error.
  - Botón interactivo para ver u ocultar la contraseña.
  - Redirección automática a la vista de administración al autenticarse.

- **Pantalla de Gestión de Pacientes (`pacientes.html`)**:
  - Panel principal con métricas dinámicas (Total pacientes, Citas de hoy, Historias clínicas).
  - Tabla interactiva con estados de pacientes (Activo, Pendiente).
  - Buscador en tiempo real para filtrar la lista de pacientes.
  - Modal para registro de nuevo paciente con notificación Toast de confirmación (*"¡Se guardó correctamente!"*).
  - Cierre de sesión y retorno seguro a la pantalla de login.

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica multisección.
- **CSS3 Vanilla**: Diseño responsivo, variables CSS, microanimaciones y diseño limpio.
- **JavaScript (ES6+)**: Lógica desacoplada por módulo (`app.js` y `pacientes.js`).

## 💻 Ejecución

Abre `index.html` en cualquier navegador web moderno o utiliza una extensión como *Live Server*.
