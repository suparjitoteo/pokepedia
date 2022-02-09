import { KeyValueType } from "@type/common-type";

export const BASE_URL = "https://pokeapi.co/api/v2/";

export const fetcher = async <T>(url: string): Promise<T> => {
  if (url.startsWith("/")) {
    const baseUrlWithoutTrailingSlash = BASE_URL?.replace(/\/$/, "");
    url = baseUrlWithoutTrailingSlash + url;
  } else {
    url = BASE_URL + url;
  }

  const res = await fetch(url);
  if (!res.ok) {
    let error: KeyValueType = {};
    try {
      const result = await res.json();
      error = {
        message: result,
      };

      throw error;
    } catch (err: any) {
      error = {
        status: res.status,
        statusText: res.statusText,
        message: err?.message ?? res.url,
      };

      throw error;
    }
  }

  return res.json();
};
