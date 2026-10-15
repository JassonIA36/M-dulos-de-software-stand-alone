/**
 * DentalCare - Login y Control de Sesión con Validación y Ver Contraseña
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  const errorAlert = document.getElementById('login-error-alert');
  const errorText = document.getElementById('login-error-text');

  // Botón mostrar / ocultar contraseña
  const btnTogglePassword = document.getElementById('btn-toggle-password');
  const eyeIconShow = document.getElementById('eye-icon-show');
  const eyeIconHide = document.getElementById('eye-icon-hide');

  // Contraseña válida por defecto para el sistema
  const VALID_PASSWORD = '123456';

  // ==========================================================================
  // MOSTRAR / OCULTAR CONTRASEÑA
  // ==========================================================================
  if (btnTogglePassword && loginPassword) {
    btnTogglePassword.addEventListener('click', () => {
      const isPassword = loginPassword.type === 'password';

      loginPassword.type = isPassword ? 'text' : 'password';

      if (isPassword) {
        eyeIconShow.classList.add('hidden');
        eyeIconHide.classList.remove('hidden');
        btnTogglePassword.setAttribute('title', 'Ocultar contraseña');
        btnTogglePassword.setAttribute('aria-label', 'Ocultar contraseña');
      } else {
        eyeIconShow.classList.remove('hidden');
        eyeIconHide.classList.add('hidden');
        btnTogglePassword.setAttribute('title', 'Mostrar contraseña');
        btnTogglePassword.setAttribute('aria-label', 'Mostrar contraseña');
      }

      // Mantener el foco en el campo
      loginPassword.focus();
    });
  }

  // ==========================================================================
  // GESTIÓN DE ERRORES VISUALES
  // ==========================================================================
  function showError(message) {
    if (errorText) errorText.textContent = message;
    if (errorAlert) {
      errorAlert.classList.remove('hidden');
      // Reiniciar animación shake si ya estaba visible
      errorAlert.style.animation = 'none';
      void errorAlert.offsetWidth; // trigger reflow
      errorAlert.style.animation = 'shake 0.4s ease-in-out';
    }
    if (loginPassword) {
      loginPassword.classList.add('input-error');
      loginPassword.focus();
      loginPassword.select();
    }
  }

  function clearError() {
    if (errorAlert) errorAlert.classList.add('hidden');
    if (loginPassword) loginPassword.classList.remove('input-error');
    if (loginEmail) loginEmail.classList.remove('input-error');
  }

  // Quitar el estado de error cuando el usuario vuelva a escribir
  if (loginPassword) {
    loginPassword.addEventListener('input', clearError);
  }
  if (loginEmail) {
    loginEmail.addEventListener('input', clearError);
  }

  // ==========================================================================
  // ENVÍO Y VALIDACIÓN DEL FORMULARIO
  // ==========================================================================
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = loginEmail ? loginEmail.value.trim() : '';
      const password = loginPassword ? loginPassword.value : '';

      // Validación 1: Correo vacío
      if (!email) {
        if (loginEmail) loginEmail.classList.add('input-error');
        showError('Por favor, ingresa tu correo electrónico.');
        return;
      }

      // Validación 2: Contraseña errada
      if (password !== VALID_PASSWORD) {
        showError('Contraseña incorrecta. Por favor, verifica tus datos.');
        return;
      }

      // Credenciales correctas: limpiar errores y guardar sesión
      clearError();
      localStorage.setItem('dentalcare_user', email);

      // Redirigir a la pantalla de pacientes
      window.location.href = 'pacientes.html';
    });
  }
});
