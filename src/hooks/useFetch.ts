import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../redux/store";

const useFetch = <T>(
  fetchFunction: () => Promise<AxiosResponse<T>>,
  action: (data: T) => void,
  selector: (state: RootState) => any,
  enabled: boolean = true
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const existingData = useSelector(selector); // Get current state

  useEffect(() => {
    if (!enabled || existingData) {
      setLoading(false);
      return;
    }
    const getData = async () => {
      try {
        const result = await fetchFunction();
        dispatch(action(result.data)); // Dispatch action to store data in Redux
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if(!existingData) {
      getData().then();
    }
  }, [fetchFunction, dispatch, action, existingData, enabled]);

  return { loading, error };
};

export default useFetch;
