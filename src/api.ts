import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function setAuth(token: string | null) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// Set inicial
setAuth(localStorage.getItem("token"));

// Si el token expira, se elimina del localStorage y de los headers
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      setAuth(null);
      window.location.href = "/";
    }

    return Promise.reject(err);
  }
);