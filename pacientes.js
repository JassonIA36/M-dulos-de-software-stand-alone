/**
 * DentalCare - Lógica de la Pantalla de Gestión de Pacientes
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elementos de Usuario y Sesión
  const currentUserEmail = document.getElementById('current-user-email');
  const btnLogout = document.getElementById('btn-logout');

  // Cargar usuario autenticado si existe en localStorage
  const savedUser = localStorage.getItem('dentalcare_user');
  if (savedUser && currentUserEmail) {
    currentUserEmail.textContent = savedUser;
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
      localStorage.removeItem('dentalcare_user');
      // Redirige al login (index.html)
      window.location.href = 'index.html';
    });
  }

  // Elementos del modal
  const patientModal = document.getElementById('patient-modal');
  const btnOpenModal = document.getElementById('btn-open-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const newPatientForm = document.getElementById('new-patient-form');
  const patientFullname = document.getElementById('patient-fullname');
  const patientDoc = document.getElementById('patient-doc');
  const patientPhone = document.getElementById('patient-phone');

  // Elementos del dashboard
  const patientsTableBody = document.getElementById('patients-table-body');
  const statTotalPatients = document.getElementById('stat-total-patients');
  const patientSearch = document.getElementById('patient-search');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');

  // Notificaciones Toast
  const toast = document.getElementById('success-toast');
  const toastMessage = document.getElementById('toast-message');
  const toastCloseBtn = document.getElementById('toast-close-btn');
  let toastTimer = null;

  let totalPatientsCount = 24;

  // ==========================================================================
  // MODAL DE REGISTRO DE PACIENTE
  // ==========================================================================

  function openModal() {
    if (!patientModal) return;
    patientModal.classList.remove('hidden');
    if (patientFullname) patientFullname.focus();
  }

  function closeModal() {
    if (!patientModal) return;
    patientModal.classList.add('hidden');
  }

  if (btnOpenModal) btnOpenModal.addEventListener('click', openModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

  // Cerrar al hacer click fuera de la tarjeta modal
  if (patientModal) {
    patientModal.addEventListener('click', (e) => {
      if (e.target === patientModal) {
        closeModal();
      }
    });
  }

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && patientModal && !patientModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Guardar paciente (incluso si está incompleto, muestra confirmación exitosa)
  if (newPatientForm) {
    newPatientForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = (patientFullname && patientFullname.value.trim()) || 'Jasson Palmera';
      const docVal = (patientDoc && patientDoc.value.trim()) || '1.095.432.190';
      const phoneVal = (patientPhone && patientPhone.value.trim()) || '300 987 6543';

      // Crear la nueva fila en la tabla de pacientes
      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td class="patient-name">${escapeHtml(nameVal)}</td>
        <td>${escapeHtml(docVal)}</td>
        <td>${escapeHtml(phoneVal)}</td>
        <td>${formattedDate}</td>
        <td><span class="badge badge-active">Activo</span></td>
      `;

      // Añadir al inicio de la tabla
      if (patientsTableBody) {
        patientsTableBody.insertBefore(newRow, patientsTableBody.firstChild);
      }

      // Incrementar contador
      totalPatientsCount++;
      if (statTotalPatients) {
        statTotalPatients.textContent = totalPatientsCount;
      }

      // Cerrar modal
      closeModal();

      // Notificación Toast de éxito
      showToast('¡Se guardó correctamente!', `El paciente "${nameVal}" ha sido registrado con éxito.`);

      // Limpiar formulario dejando placeholder listo para el próximo
      if (patientFullname) patientFullname.value = '';
      if (patientDoc) patientDoc.value = '';
      if (patientPhone) patientPhone.value = '';
    });
  }

  // ==========================================================================
  // FILTRO DE BÚSQUEDA EN TIEMPO REAL
  // ==========================================================================

  if (patientSearch && patientsTableBody) {
    patientSearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const rows = patientsTableBody.querySelectorAll('tr');

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(term)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // ==========================================================================
  // MENÚ MÓVIL
  // ==========================================================================

  if (mobileMenuToggle && sidebar) {
    mobileMenuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // ==========================================================================
  // FUNCIÓN PARA MOSTRAR MENSAJE TOAST
  // ==========================================================================

  function showToast(title, message) {
    if (!toast) return;

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    const titleEl = toast.querySelector('.toast-title');
    if (titleEl) titleEl.textContent = title;
    if (toastMessage) toastMessage.textContent = message;

    toast.classList.remove('hidden');

    toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 4500);
  }

  if (toastCloseBtn) {
    toastCloseBtn.addEventListener('click', () => {
      if (toastTimer) clearTimeout(toastTimer);
      if (toast) toast.classList.add('hidden');
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
