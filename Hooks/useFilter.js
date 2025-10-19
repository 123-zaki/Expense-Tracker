import { useState } from "react";

export function useFilter(dataList, callBack) {
  const [query, setQuery] = useState("");
  return [dataList.filter((data) => callBack(data).includes(query)), setQuery];
}