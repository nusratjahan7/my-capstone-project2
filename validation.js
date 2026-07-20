export function validateUsername(username = '') {
  if (!username) return 'Username is required.';
  if (!/^[a-zA-Z0-9]{3,20}$/.test(username)) {
    return 'Username must be 3–20 alphanumeric characters.';
  }
  return '';
}

export function validateEmail(email = '') {
  if (!email) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Enter a valid email address.';
  }
  return '';
}

export function validatePassword(password = '') {
  if (!password) return '';
  if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[^A-Za-z0-9\s]/.test(password)) {
    return 'Password must be at least 8 characters and include uppercase, lowercase, and a special character.';
  }
  return '';
}

export function validateSettings({ username = '', email = '', password = '' }) {
  const errors = {
    username: validateUsername(username.trim()),
    email: validateEmail(email.trim()),
    password: validatePassword(password),
  };

  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message));
}
