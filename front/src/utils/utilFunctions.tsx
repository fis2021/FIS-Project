import { useEffect, useState } from "react";

export function useTitle(appTitle: string) {
    const [title, setTitle] = useState(appTitle);
    useEffect(() => {
        document.title = title;
    }, [title]);
    return setTitle;
}

export async function fetchAndParse<T>(input: RequestInfo,init: RequestInit): Promise<T>{
  
    const result = await fetch(input,init);

    try {
        const data = await result.json();
        return data as T;
      } catch (e) {
        return (result as unknown) as T;
      }
}