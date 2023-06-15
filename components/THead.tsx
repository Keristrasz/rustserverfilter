import React, { useState } from "react";
import useSorter from "@/hooks/useSorter";
import { FilterType, SorterType } from "@/utils/typesTypescript";

interface ColumnData {
  isClickable: boolean;
  styles: string;
  name: string;
  value: string;
}

interface THeadProps {
  sorter: SorterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  setSorter: React.Dispatch<React.SetStateAction<SorterType | {}>>;
  isSSG: Boolean;
  columnData: ColumnData[];
}

const THead: React.FC<THeadProps> = ({ setFilter, setSorter, sorter, isSSG, columnData }) => {
  const updateSorter = useSorter(setFilter, setSorter);

  return (
    <thead className="bg-zinc-800 sticky top-0 z-10">
      <tr>
        {columnData.map((column) => {
          let sortColorClass = "";

          if (isSSG && sorter[column.value] === 1) {
            sortColorClass = "bg-red-900";
            ("Arrow up");
          } else if (isSSG && sorter[column.value] === -1) {
            sortColorClass = "bg-green-900";
            ("Arrow down");
          }

          return column.isClickable ? (
            <th
              onClick={() => updateSorter(column.value)}
              key={column.value}
              className={`${column.styles} ${sortColorClass} px-2 py-2 h-8 text-left text-xs font-semibold text-green-400 uppercase tracking-tight hover:cursor-pointer`}
            >
              <span className="flex items-center">
                {column.name}
                {isSSG && sorter[column.value] === 1 && (
                  <span className="text-2xl text-green-400 ml-0 mb-2">↑</span>
                )}
                {isSSG && sorter[column.value] === -1 && (
                  <span className="text-2xl text-green-400 ml-0 mb-2">↓</span>
                )}
              </span>
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
