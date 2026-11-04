import { setAuth } from "./api";
import { clearLocalData, ensureLocalOwner } from "./onfline/db";
import { unsubscribePush } from "./push";

// Guarda la sesión tras login/registro
export async function startSession(
  token: string,
  userId: string
) {
  localStorage.setItem("token", token);
  setAuth(token);
  await ensureLocalOwner(String(userId));
}

// Cierra la sesión: se deja de recibir notificaciones
// y se borran los datos locales
export async function logout() {
  try {
    await unsubscribePush();
  } catch (error) {
    console.error(
      "Error al cancelar las notificaciones push:",
      error
    );
  }

  await clearLocalData();
  localStorage.removeItem("token");
  setAuth(null);
  window.location.href = "/";
}
