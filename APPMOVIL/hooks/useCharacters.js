import { useCallback, useEffect, useRef, useState } from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character';
const TIMEOUT_MS = 10000;

// Custom Hook que concentra toda la lógica de consumo de la API.
// La pantalla solo recibe los datos y los estados ya resueltos.
export default function useCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  const fetchCharacters = useCallback(async () => {
    // Si la API no responde en el tiempo límite, se cancela la petición.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      setError(null);
      const response = await fetch(API_URL, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(`El servidor respondió con el código ${response.status}.`);
      }

      const json = await response.json();
      const results = Array.isArray(json.results) ? json.results : [];

      if (isMounted.current) {
        setCharacters(results);
      }
    } catch (err) {
      if (isMounted.current) {
        setCharacters([]);
        setError(
          err.name === 'AbortError'
            ? 'La API tardó demasiado en responder. Intenta de nuevo.'
            : 'No se pudieron cargar los datos. Revisa tu conexión a internet.'
        );
      }
    } finally {
      clearTimeout(timeout);
      if (isMounted.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  // Primera carga al abrir la pantalla.
  useEffect(() => {
    isMounted.current = true;
    fetchCharacters();

    return () => {
      isMounted.current = false;
    };
  }, [fetchCharacters]);

  // Reintento después de un error: vuelve a mostrar el estado de carga.
  const retry = useCallback(() => {
    setLoading(true);
    fetchCharacters();
  }, [fetchCharacters]);

  // Recarga al deslizar la lista hacia abajo.
  const refresh = useCallback(() => {
    setRefreshing(true);
    fetchCharacters();
  }, [fetchCharacters]);

  return { characters, loading, refreshing, error, retry, refresh };
}
