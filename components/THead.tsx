import React from "react";
import useSorter from "@/hooks/useSorter";
import { FilterType, SorterType } from "@/utils/typesTypescript";

interface THeadProps {
  sorter: SorterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  setSorter: React.Dispatch<React.SetStateAction<SorterType | {}>>;
}

export const columnData = [
  // {
  //   styles: "w-1/12",
  //   isClickable: false,
  //   name: "IP",
  //   value: "addr",
  // },
  { isClickable: true, styles: "w-1/12", name: "Score", value: "rank" },
  { isClickable: false, styles: "w-4/12", name: "Name", value: "name" },
  { isClickable: true, styles: "w-1/12", name: "Players", value: "players" },
  { isClickable: true, styles: "w-2/12", name: "Next Wipe", value: "born_next" },
  { isClickable: true, styles: "w-2/12", name: "Wiped", value: "born" },
  { isClickable: true, styles: "w-1/12", name: "Rate", value: "rate" },
  { isClickable: true, styles: "w-1/12", name: "Group size", value: "max_group_size" },
  // { isClickable: false, styles: "1/12", name: "Uptime", value: "uptime" },
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
        {columnData.map((column) =>
          column.isClickable ? (
            <th
              onClick={() => updateSorter(column.value)}
              key={column.value}
              className={`${column.styles} px-2 py-2 text-left text-s font-semibold text-gray-200 uppercase tracking-wider hover:cursor-pointer`}
            >
              {column.name}
              {sorter[column.value] === 1 ? "->" : sorter[column.value] === -1 ? "<-" : null}
            </th>
          ) : (
            <th
              key={column.value}
              className={`${column.styles} px-2 py-2 text-left text-s font-semibold text-gray-200 uppercase tracking-wider`}
            >
              {column.name}
            </th>
          )
        )}
      </tr>
    </thead>
  );
};
export default React.memo(THead);
