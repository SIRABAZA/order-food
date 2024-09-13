import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong failed to send request"
    );
  }
  return data;
}

export default function useHttp(url, config, initilalData) {
  const [data, setData] = useState(initilalData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initilalData);
  }

  const sendRequest = useCallback(
    async function sendRequest(orderData) {
      setIsLoading(true);
      try {
        const data = await sendHttpRequest(url, { ...config, body: orderData });
        setData(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    setError,
    clearData,
  };
}
