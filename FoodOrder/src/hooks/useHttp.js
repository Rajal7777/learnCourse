import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

 const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message ||
      "Something went wrong, failed to send request"
    );
  }

  return resData;
}




//url-api endpoint config-(method,headers) initialData-([],{})
export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function clearData() {
    setData(initialData);
  }

  //used useCallback from preventing function from being recreated on every render also prevent from infinite loop.

  const sendRequest = useCallback (
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data }); //body: data -(data for POST/PUT)
        setData(resData);
      } catch (error) {
        setError(error.message || "something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]); //fn updates if either url/config changes

    useEffect(() => {
        if((config && (config.method === 'GET' || !config.method)) || !config){
            sendRequest();
        }
    },[sendRequest, config])

    return {
        data, 
        isLoading,
        error,
        sendRequest,
        clearData,
    }
}
