import { createContext, useState, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentUserContext = createContext();

export default CurrentUserContext;

export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useLocalStorage("tokeeen", "");
  const [isTokenValid, setIsTokenValid] = useState(null);

  // Fonction utilitaire pour gérer l'expiration des tokens
  const handleApiResponse = async (response) => {
    if (response.status === 401) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.code === "TOKEN_EXPIRED" || errorData.message === "Invalid token") {
        setToken(""); // Supprime le token
        setUser({}); // Réinitialise l'utilisateur
        setIsTokenValid(false);
        window.location.href = "/"; // Redirection
      }
    }
    return response;
  };

  // Vérification du token au chargement de l'app
  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    if (!token) {
      setIsTokenValid(false);
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/verify-token`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        // Token invalide, suppression + redirection
        setToken("");
        setUser({});
        setIsTokenValid(false);
        // window.location.href = "/";
      } else if (response.ok) {
        // Token valide
        setIsTokenValid(true);
      } else {
        // Erreur serveur, considérer comme invalide par sécurité
        setToken("");
        setUser({});
        setIsTokenValid(false);
        // window.location.href = "/";
      }
    } catch (error) {
      console.warn("Erreur lors de la vérification du token:", error);
      // En cas d'erreur réseau, garder le token mais marquer comme invalide
      setIsTokenValid(false);
    }
  };

  // Afficher un loader pendant la vérification du token
  if (isTokenValid === null) {
    return /* (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Vérification de la session...</div>
      </div>
    ); */
  }

  return (
    <CurrentUserContext.Provider
      value={{ user, setUser, token, setToken, handleApiResponse, isTokenValid }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export const useCurrentUserContext = () => useContext(CurrentUserContext);
// en utilisant une fonction intermédiaire, on encapsule l'appel à useContext(CurrentUserContext) dans une fonction personnalisée (contrairement à l'appel direct). Nous aurons donc plus de flexibilité pour gérer les opérations personnalisées.
