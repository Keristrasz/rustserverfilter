import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function SearchResults() {
  const fetchData = () =>
    fetch("https://api.battlemetrics.com/servers").then((res) => res.json());

  const getData = useQuery({
    queryKey: ["searchResults"],
    queryFn: fetchData,
  });
  let renderAllResults;
  if (getData.isLoading) renderAllResults = <div>Loading...</div>;

  if (getData.error instanceof Error)
    renderAllResults = <div>An error has occurred: {getData.error.message}</div>;
  console.log(getData.data);
  renderAllResults = getData.data.data.map((result) => <li key={result.id}>{result.id}</li>);
}
