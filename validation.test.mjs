import assert from 'node:assert/strict';
import test from 'node:test';
import { validateEmail, validatePassword, validateSettings, validateUsername } from './validation.js';

test('username requires 3–20 alphanumeric characters', () => {
  assert.equal(validateUsername('ab'), 'Username must be 3–20 alphanumeric characters.');
  assert.equal(validateUsername('validUser20'), '');
  assert.notEqual(validateUsername('valid_user'), '');
  assert.notEqual(validateUsername('a'.repeat(21)), '');
});

test('email requires a valid email format', () => {
  assert.equal(validateEmail('person@example.com'), '');
  assert.equal(validateEmail('not-an-email'), 'Enter a valid email address.');
});

test('password is optional but must be strong when present', () => {
  assert.equal(validatePassword(''), '');
  assert.equal(validatePassword('Password!'), '');
  assert.notEqual(validatePassword('password!'), '');
  assert.notEqual(validatePassword('PASSWORD!'), '');
  assert.notEqual(validatePassword('Password1'), '');
});

test('settings validation reports only invalid fields', () => {
  assert.deepEqual(validateSettings({ username: 'Sam9', email: 'sam@example.com', password: '' }), {});
  assert.deepEqual(Object.keys(validateSettings({ username: '!', email: 'bad', password: 'weak' })), ['username', 'email', 'password']);
});
