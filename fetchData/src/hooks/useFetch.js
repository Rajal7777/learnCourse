import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialVlaue){
    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchedData, setFetchData] = useState([]);

      useEffect(() => {
        async function fetchData() {
          setIsFetching(true);
          try {
            const place = await fetchFn();
            setFetchData(place);
          } catch (error) {
            setError({
              message: error.message || "Could not fetch places, please try again later",
            });
          }
    
          setIsFetching(false);
        }
    
       fetchData();
      }, [fetchFn]);

      return {
        isFetching,
        fetchedData,
        setFetchData,
        error
      }
}