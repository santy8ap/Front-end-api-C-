import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import { API_URL } from "../utils/constants";
import Cookies from "js-cookie";

// =======================================
// 🔧 Configuración básica de Axios
// =======================================
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

// =======================================
// 🔐 Interceptor: Añadir Token al Request
// =======================================
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("token");

    if (token) {
      // AxiosHeaders soporta el método set()
      config.headers.set("Authorization", `Bearer ${token}`);
      console.log(`🔑 [TOKEN] Añadido → ${config.method?.toUpperCase()} ${config.url}`);
    } else {
      console.warn("⚠️ [TOKEN] No disponible para esta petición");
    }

    console.log(`📡 [REQUEST] ${config.method?.toUpperCase()} → ${config.baseURL}${config.url}`);

    return config;
  },
  (error: AxiosError) => {
    console.error("❌ [REQUEST ERROR]:", error.message);
    return Promise.reject(error);
  }
);


// =======================================
// 📥 Interceptor: Respuestas + Manejo 401
// =======================================
api.interceptors.response.use(
  (response) => {
    console.log(`✅ [RESPONSE] ${response.status} → ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url;

    console.error(`❌ [RESPONSE ERROR] ${status} → ${url}`);
    console.error("Detalles:", error.response?.data);

    // ✨ Manejo de expiración de token
    if (status === 401) {
      console.warn("🔐 Token expirado o inválido → Redirigiendo a /login");

      Cookies.remove("token");
      localStorage.removeItem("user");

      // Evita redirecciones múltiples en caso de spam de requests
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
