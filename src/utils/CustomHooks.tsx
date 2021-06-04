import { useEffect, useState } from "react";
import CSVJson from "../data/csvjson.json";

type CSVObject = {
  district_id: number;
  district_name: string;
  state_id: number;
};

export const useFetchDistrictJson = () => {
  const [jsonData, setJsonData] = useState<Array<CSVObject>>([]);

  useEffect(() => {
    setJsonData(CSVJson);
  }, []);

  return [...jsonData];
};
