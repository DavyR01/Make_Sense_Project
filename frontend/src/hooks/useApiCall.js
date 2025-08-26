import { useCallback } from "react";
import { useCurrentUserContext } from "../context/UserContext";

/**
 * Hook personnalisé pour faire des appels API avec gestion automatique de l'expiration du token
 * @returns {Function} apiCall - Fonction pour faire des appels API sécurisés
 */
const useApiCall = () => {
  const { token, handleApiResponse } = useCurrentUserContext();

  /**
   * Effectue un appel API avec gestion automatique de l'expiration du token
   * @param {string} url - URL de l'API
   * @param {Object} options - Options pour fetch (method, headers, body, etc.)
   * @returns {Promise<Response>} - Réponse de l'API
   */
  const apiCall = useCallback(
    async (url, options = {}) => {
      // Ajouter les headers par défaut et l'Authorization header si un token existe
      const headers = {
        "Content-Type": "application/json",
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Gérer automatiquement l'expiration du token
      return handleApiResponse(response);
    },
    [token, handleApiResponse]
  );

  return apiCall;
};

export default useApiCall;
