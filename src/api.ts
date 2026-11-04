import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15_000, // para  no deje una conexion colgada
});

export function setAuth(token: string | null) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
  } 

// Set inicial
setAuth(localStorage.getItem("token"));

// Si el token expira, se elimina del localStorage y de los headers
api.interceptors.response.use(
  (r) => r,
  (err) => {
    const url: string = err.config?.url ?? "";
    if (err.response?.status === 401 && !url.startsWith("/auth")) {
      localStorage.removeItem("token");
      setAuth(null);
      window.location.href = "/";
    }

    return Promise.reject(err);
  }
);

/**Mesaje que muestre cual fue el error */
export function errorMessage(err: unknown, fallback = "Ocurre un errror"){
  if (axios.isAxiosError(err)){
    if (!err.response) return "Sin conexion del servidor";
    return(err.response.data as { message?: string})?.message ?? fallback; 
  }
  return err instanceof Error ? err.message : fallback;
}
