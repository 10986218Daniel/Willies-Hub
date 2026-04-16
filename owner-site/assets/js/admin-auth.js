const OWNER_PASSWORD = "owner123";

function isOwnerLoggedIn() {
  return localStorage.getItem(STORAGE_KEYS.ownerSession) === "ok";
}

function loginOwner(password) {
  const trimmed = password.trim();
  console.log("Checking password:", trimmed, "against:", OWNER_PASSWORD);
  if (trimmed === OWNER_PASSWORD) {
    console.log("Password matches - setting session");
    localStorage.setItem(STORAGE_KEYS.ownerSession, "ok");
    return true;
  }
  console.log("Password does not match");
  return false;
}

function logoutOwner() {
  localStorage.removeItem(STORAGE_KEYS.ownerSession);
}
