import { validateSettings } from './validation.js';

const form = document.getElementById('settings-form');
const submitButton = form.querySelector('button[type="submit"]');
const successMessage = document.getElementById('success-message');
const fieldNames = ['username', 'email', 'password'];

function valuesFromForm() {
  return Object.fromEntries(new FormData(form));
}

function setError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const error = document.getElementById(`${fieldName}-error`);
  field.setAttribute('aria-invalid', String(Boolean(message)));
  error.textContent = message;
}

function showValidation() {
  const errors = validateSettings(valuesFromForm());
  fieldNames.forEach((fieldName) => setError(fieldName, errors[fieldName] ?? ''));
  return errors;
}

fieldNames.forEach((fieldName) => {
  document.getElementById(fieldName).addEventListener('input', () => {
    successMessage.textContent = '';
    showValidation();
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const errors = showValidation();

  if (Object.keys(errors).length > 0) {
    successMessage.textContent = '';
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Saving…';
  successMessage.textContent = '';

  try {
    // Replace this with the application's settings API when one is available.
    await new Promise((resolve) => setTimeout(resolve, 500));
    successMessage.textContent = 'Settings saved successfully.';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Save settings';
  }
});
