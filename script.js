const form = document.getElementById('settings-form');
const fields = {
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    timezone: document.getElementById('timezone'),
};

const errors = {
    fullName: document.getElementById('fullName-error'),
    email: document.getElementById('email-error'),
    password: document.getElementById('password-error'),
    confirmPassword: document.getElementById('confirmPassword-error'),
    timezone: document.getElementById('timezone-error'),
};

const successMessage = document.getElementById('success-message');

function setError(fieldName, message) {
    fields[fieldName].setAttribute('aria-invalid', message ? 'true' : 'false');
    errors[fieldName].textContent = message;
}

function validateField(fieldName) {
    const value = fields[fieldName].value.trim();

    if (fieldName === 'fullName') {
        if (!value) {
            setError('fullName', 'Full name is required.');
            return false;
        }
        if (value.length < 2) {
            setError('fullName', 'Enter at least 2 characters.');
            return false;
        }
        setError('fullName', '');
        return true;
    }

    if (fieldName === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setError('email', 'Email is required.');
            return false;
        }
        if (!emailPattern.test(value)) {
            setError('email', 'Enter a valid email address.');
            return false;
        }
        setError('email', '');
        return true;
    }

    if (fieldName === 'password') {
        if (!value) {
            setError('password', 'Password is required.');
            return false;
        }
        if (value.length < 8) {
            setError('password', 'Password must be at least 8 characters.');
            return false;
        }
        setError('password', '');
        return true;
    }

    if (fieldName === 'confirmPassword') {
        if (!fields.confirmPassword.value.trim()) {
            setError('confirmPassword', 'Please confirm your password.');
            return false;
        }
        if (fields.confirmPassword.value !== fields.password.value) {
            setError('confirmPassword', 'Passwords do not match.');
            return false;
        }
        setError('confirmPassword', '');
        return true;
    }

    if (fieldName === 'timezone') {
        if (!value) {
            setError('timezone', 'Please choose a timezone.');
            return false;
        }
        setError('timezone', '');
        return true;
    }

    return true;
}

Object.entries(fields).forEach(([fieldName, field]) => {
    field.addEventListener('blur', () => validateField(fieldName));
    field.addEventListener('input', () => {
        if (fieldName === 'password' || fieldName === 'confirmPassword') {
            validateField('password');
            validateField('confirmPassword');
        } else {
            validateField(fieldName);
        }
    });
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const results = Object.keys(fields).map(validateField);
    const allValid = results.every(Boolean);

    if (allValid) {
        successMessage.textContent = 'Settings saved successfully.';
        form.reset();
        Object.keys(errors).forEach((key) => setError(key, ''));
    } else {
        successMessage.textContent = '';
    }
});
