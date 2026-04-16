const OWNER_PASSWORD = "owner123";

function isOwnerLoggedIn() {
  return localStorage.getItem(STORAGE_KEYS.ownerSession) === "ok";
}

function loginOwner(password) {
  const trimmed = password.trim();
  if (trimmed === OWNER_PASSWORD) {
    localStorage.setItem(STORAGE_KEYS.ownerSession, "ok");
    return true;
  }
  return false;
}

function logoutOwner() {
  localStorage.removeItem(STORAGE_KEYS.ownerSession);
}
