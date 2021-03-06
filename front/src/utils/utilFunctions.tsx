import { useEffect, useState } from "react";

export function useTitle(appTitle: string) {
    const [title, setTitle] = useState(appTitle);
    useEffect(() => {
        document.title = title;
    }, [title]);
    return setTitle;
}

export async function fetchAndParse<T>(input: RequestInfo, init: RequestInit): Promise<T> {

  const result = await fetch(input, init);
  if (result.status >= 400) {
    // eslint-disable-next-line no-throw-literal
    throw {
      status: result.status,
      statusText: result.statusText,
      text: await result.text(),
      toString() {
        return `${this.status} - ${this.text || this.statusText}`;
      },
    };
  }
  try {
    const data = await result.json();
    return data as T;
  } catch (e) {
    return (result as unknown) as T;
  }
}