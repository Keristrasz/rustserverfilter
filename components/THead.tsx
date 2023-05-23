import React from "react";
import useSorter from "@/hooks/useSorter";
import { FilterType, SorterType } from "@/utils/typesTypescript";

interface THeadProps {
  sorter: SorterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  setSorter: React.Dispatch<React.SetStateAction<SorterType | {}>>;
}

const columnHeadings = [
  {
    width: "1/12",
    isClickable: false,
    name: "IP",
    value: "addr",
  },
  { isClickable: false, width: "1/12", name: "Name", value: "name" },
  { isClickable: true, width: "1/12", name: "Rank", value: "rank" },
  { isClickable: true, width: "2/12", name: "Next Wipe", value: "born_next" },
  { isClickable: true, width: "2/12", name: "Wiped", value: "born" },
  { isClickable: false, width: "1/12", name: "Uptime", value: "uptime" },
  { isClickable: true, width: "1/12", name: "Rate", value: "rate" },
  { isClickable: true, width: "1/12", name: "Group size", value: "max_group_size" },
  { isClickable: true, width: "1/12", name: "Players", value: "players" },
  { isClickable: false, width: "1/12", name: "Country", value: "rules.location.country" },
  {
    isClickable: false,
    width: "2/12",
    name: "Distance",
    value: "rules.location.longitude",
  },
];
const THead: React.FC<THeadProps> = ({ setFilter, setSorter, sorter }) => {
  const updateSorter = useSorter(setFilter, setSorter);
  return (
    <thead className="bg-gray-50">
      <tr>
        {columnHeadings.map((el) =>
          el.isClickable ? (
            <th
              onClick={() => updateSorter(el.value)}
              key={el.value}
              className={`w-${el.width} px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:cursor-pointer`}
            >
              {el.name}
              {sorter[el.value] === 1 ? "->" : sorter[el.value] === -1 ? "<-" : null}
            </th>
          ) : (
            <th
              key={el.value}
              className={`w-${el.width} px-5 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
            >
              {el.name}
            </th>
          )
        )}
      </tr>
    </thead>
  );
};
export default React.memo(THead);
