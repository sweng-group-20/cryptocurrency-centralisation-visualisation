import { useState, useEffect } from 'react';

/**
 * React hook to fetch from urls
 * @param {string} url Url to fetch from
 * @param {RequestInit} options Options to use when fetching
 * @param {any} defaultData Data to default to if fetch is still loading
 */
const useFetch = (url, options, defaultData) => {
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading };
};

export default useFetch;
