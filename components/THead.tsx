import React, { useState } from "react";
import useSorter from "@/hooks/useSorter";
import { FilterType, SorterType } from "@/utils/typesTypescript";
import { columnData } from "./HOC/ResultsTable";

interface THeadProps {
  sorter: SorterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  setSorter: React.Dispatch<React.SetStateAction<SorterType | {}>>;
  isSSG: Boolean;
}

const THead: React.FC<THeadProps> = ({ setFilter, setSorter, sorter, isSSG }) => {
  const updateSorter = useSorter(setFilter, setSorter);

  return (
    <thead className="bg-zinc-800 sticky top-0 z-10">
      <tr>
        {columnData.map((column) => {
          let sortColorClass = "";

          if (isSSG && sorter[column.value] === 1) {
            sortColorClass = "bg-rustThree";
            console.log("Arrow up");
          } else if (isSSG && sorter[column.value] === -1) {
            sortColorClass = "bg-green-700";
            console.log("Arrow down");
          }

          return column.isClickable ? (
            <th
              onClick={() => updateSorter(column.value)}
              key={column.value}
              className={`${column.styles} ${sortColorClass}    px-2 py-2 h-8 text-left text-xs font-semibold text-green-400 uppercase tracking-tight hover:cursor-pointer`}
            >
              {column.name}
              {isSSG && sorter[column.value] === 1 ? (
                <span className="text-xl text-rustOne">↑</span>
              ) : isSSG && sorter[column.value] === -1 ? (
                <span className="text-xl text-green-500">↓</span>
              ) : null}
            </th>
          ) : (
            <th
              key={column.value}
              className={`${column.styles}  px-2 py-2 h-8 text-left text-xs font-semibold text-gray-200 uppercase tracking-tight`}
            >
              {column.name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
export default React.memo(THead);
