import { FilterType, SorterType } from "@/constants/TGlobal";

const useSorter = (
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>,
  setSorter: React.Dispatch<React.SetStateAction<SorterType>>
) => {
  console.log("useSorter recreated");
  const roundBySeconds = 100;
  const nowMiliseconds = new Date().getTime();
  const nowSeconds = Math.floor(nowMiliseconds / 1000 / roundBySeconds) * roundBySeconds - 100;
  const timestampTenMonthsAgo =
    Math.floor((nowMiliseconds / 1000 - 28000000) / roundBySeconds) * roundBySeconds;

  const updateSorter = (key: string) => {
    key;
    setFilter((prevValue) => {
      if (key === "born") {
        if (!prevValue.$and.some((el: any) => el.born)) {
          let newValue: any = { ...prevValue };
          newValue.$and = newValue.$and.filter((el: any) => !el.born_next);
          newValue.$and.push({ born: { $lte: nowSeconds, $gte: timestampTenMonthsAgo } });
          return newValue;
        }
      } else if (key === "born_next") {
        if (!prevValue.$and.some((el: any) => el.born_next)) {
          let newValue: any = { ...prevValue };
          newValue.$and = newValue.$and.filter((el: any) => !el.born);
          newValue.$and.push({ born_next: { $gte: nowSeconds } });
          return newValue;
        }
      } else {
        let updatedValue: any = { ...prevValue };
        updatedValue.$and = updatedValue.$and.filter((el: any) => !el.born && !el.born_next);
        return updatedValue;
      }

      return prevValue;
    });
    //@ts-ignore
    setSorter((prevSorter) => {
      // Check if the key already exists in the sorter
      if (prevSorter.hasOwnProperty(key)) {
        // Toggle the sort direction by multiplying the value by -1
        const newSortValue: number = ((prevSorter as SorterType)[key] as number) * -1;
        // Remove the key if the sort direction is 1 (ascending)
        return { [key]: newSortValue }; //=== 1 ? {} : { [key]: newSortValue };
      } else {
        // Add the key with a default sort direction of -1 (descending)
        return { [key]: -1 };
      }
    });
  };

  return updateSorter;
};

export default useSorter;
