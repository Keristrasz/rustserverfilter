import React from "react";
import useSorter from "@/hooks/useSorter";
import { FilterType, SorterType } from "@/constants/TGlobal";

interface ColumnData {
  isClickable: boolean;
  styles: string;
  name: string;
  value: string;
  tooltip?: string;
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
    <thead className="bg-zinc-700 sticky z-10">
      <tr>
        {columnData.map((column) => {
          let sortColorClass = "";

          if (isSSG && sorter[column.value] === 1) {
            sortColorClass = "bg-green-800";
            ("Arrow up");
          } else if (isSSG && sorter[column.value] === -1) {
            sortColorClass = "bg-green-900";
            ("Arrow down");
          }

          return column.isClickable ? (
            <th
              onClick={() => updateSorter(column.value)}
              key={column.value}
              className={`group relative text-xs px-4 py-2 text-left font-semibold text-green-400 tracking-tight hover:cursor-pointer transition hover:text-white ${column.styles} ${sortColorClass}`}
            >
              <span
                className={`flex items-center hover-trigger group-hover:opacity-100 relative z-10 ${column.styles}`}
              >
                {/* Value */}
                {column.name}
                {/* Arrow */}
                {isSSG && sorter[column.value] === 1 && (
                  <span className="text-2xl text-green-400 ml-0.5 mb-2">↑</span>
                )}
                {isSSG && sorter[column.value] === -1 && (
                  <span className="text-2xl text-green-400 ml-0.5 mb-2">↓</span>
                )}
              </span>
              {column.tooltip && (
                <div className="text-gray-800 w-32 target-element invisible group-hover:visible transition-opacity absolute bg-white border border-gray-300 rounded p-2 z-20 mt-1 ml-2">
                  {column.tooltip}
                </div>
              )}
            </th>
          ) : (
            <th
              key={column.value}
              className={`group text-xs px-4 py-2 text-left font-semibold text-gray-200 tracking-tight ${column.styles}`}
            >
              {column.name}
              {/* {column.tooltip && (
                <div className="text-gray-800 w-32 target-element invisible group-hover:visible transition-opacity absolute bg-white border border-gray-300 rounded p-2 mb-32 z-20">
                  {column.tooltip}
                </div>
              )} */}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
export default THead;
// export default React.memo(THead);