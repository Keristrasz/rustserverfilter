import React, { useState } from "react";
import useSorter from "@/hooks/useSorter";
import { FilterType, SorterType } from "@/utils/typesTypescript";

interface THeadProps {
  sorter: SorterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  setSorter: React.Dispatch<React.SetStateAction<SorterType | {}>>;
}

export const columnData = [
  { isClickable: true, styles: "w-1/12", name: "Score", value: "rank" },
  { isClickable: false, styles: "w-6/12", name: "Name", value: "name" },
  { isClickable: true, styles: "w-1/12", name: "Players", value: "players" },
  { isClickable: true, styles: "w-2/12", name: "Next Wipe", value: "born_next" },
  { isClickable: true, styles: "w-2/12", name: "Last Wipe", value: "born" },
  { isClickable: true, styles: "w-1/12", name: "Rate", value: "rate" },
  { isClickable: true, styles: "w-1/12", name: "Group size", value: "max_group_size" },
  { isClickable: false, styles: "w-2/12", name: "Country", value: "rules.location.country" },
  {
    isClickable: false,
    styles: "w-1/12",
    name: "Distance",
    value: "rules.location.longitude",
  },
];

const THead: React.FC<THeadProps> = ({ setFilter, setSorter, sorter }) => {
  const updateSorter = useSorter(setFilter, setSorter);

  return (
    <thead className="bg-zinc-800">
      <tr>
        {columnData.map((column) => {
          let sortColorClass = "";

          if (sorter[column.value] === 1) {
            sortColorClass = "bg-rustThree";
            console.log("Arrow up");
          } else if (sorter[column.value] === -1) {
            sortColorClass = "bg-green-700";
            console.log("Arrow down");
          }

          return column.isClickable ? (
            <th
              onClick={() => updateSorter(column.value)}
              key={column.value}
              className={`${column.styles} ${sortColorClass} px-2 py-2 h-8 text-left text-xs font-semibold text-blue-400 uppercase tracking-tight hover:cursor-pointer`}
            >
              {column.name}
              {sorter[column.value] === 1 ? (
                <span className="text-xl text-rustOne">↑</span>
              ) : sorter[column.value] === -1 ? (
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
