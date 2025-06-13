// wsUtils/sessionValidator.js
function validateSession(token, sessions) {
  if (!token || !sessions.has(token)) {
    return { valid: false, error: 'Invalid or missing token.' };
  }

  const session = sessions.get(token);
  return { valid: true, session };
}

module.exports = { validateSession };
