import React, { useState } from 'react';
import { useEffectAsync } from './async-hooks';


export function useData<T>(dataLoader: () => Promise<T>, deps:  any[] = []) {

    const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffectAsync(async () => {
    try {
      setIsLoading(true);
      const newData = await dataLoader();
      setData(newData);
      setError(undefined);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, deps);

  return { data, error, isLoading, setData };
}
