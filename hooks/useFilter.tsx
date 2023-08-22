import { Dispatch, SetStateAction } from "react";
import { FilterType, UseFilterHookType } from "@/constants/TGlobal";

const useFilter = (setFilter: Dispatch<SetStateAction<FilterType>>): UseFilterHookType => {
  const updateFilter: UseFilterHookType = (
    minRank,
    wipeRotation,
    minPlayers,
    maxPlayers,
    minSize,
    maxSize,
    searchName,
    maxGroupSize,
    rate,
    includedCountries,
    excludedCountries,
    maxDistance,
    userLocation,
    isVanilla,
    isModded,
    hardcoreSoftcore
  ) => {
    let newFilter: FilterType = {
      $and: [
        {
          rank: { $gte: 500 },
        },
      ],
    };

    minRank ? newFilter.$and.push({ rank: { $gte: Number(minRank) * 100 } }) : null;
    minPlayers ? newFilter.$and.push({ players: { $gte: Number(minPlayers) } }) : null;
    maxPlayers ? newFilter.$and.push({ players: { $lte: Number(maxPlayers) } }) : null;
    minSize ? newFilter.$and.push({ "rules.size": { $gte: Number(minSize) } }) : null;
    maxSize ? newFilter.$and.push({ "rules.size": { $lte: Number(maxSize) } }) : null;
    searchName ? newFilter.$and.push({ name: { $regex: searchName, $options: "i" } }) : null;
    maxGroupSize.length !== 0
      ? newFilter.$and.push({ max_group_size: { $in: maxGroupSize } })
      : null;
    wipeRotation.length !== 0
      ? newFilter.$and.push({ wipe_rotation: { $in: wipeRotation } })
      : null;
    rate.length !== 0 ? newFilter.$and.push({ rate: { $in: rate } }) : null;

    includedCountries.length !== 0 && excludedCountries.length !== 0
      ? alert("There can be only included or excluded countries at once")
      : includedCountries.length !== 0 && excludedCountries.length === 0
      ? newFilter.$and.push({ "rules.location.country": { $in: includedCountries } })
      : excludedCountries.length !== 0 && includedCountries.length === 0
      ? newFilter.$and.push({ "rules.location.country": { $nin: excludedCountries } })
      : null;
    //@ts-ignore
    maxDistance < 0
      ? alert("Distance can not be a negative number")
      : maxDistance && userLocation
      ? newFilter.$and.push({
          "rules.location": {
            $geoWithin: {
              $centerSphere: [
                [userLocation.latitude, userLocation.longitude],
                Number((Number(maxDistance) / 6371).toFixed(6)),
              ],
            },
          },
        })
      : null;

    setFilter((prevFilter) => {
      prevFilter;
      if (prevFilter.$and.some((el) => "born" in el)) {
        ("born exists");
        const bornObject = prevFilter.$and.find((el) => "born" in el);
        if (bornObject) {
          newFilter.$and.push(bornObject);
        }
      } else if (prevFilter.$and.some((el) => "born_next" in el)) {
        ("born_next exists");
        const bornObject = prevFilter.$and.find((el) => "born_next" in el);
        if (bornObject) {
          newFilter.$and.push(bornObject);
        }
      }
      return newFilter;
    });
    newFilter;
  };
  return updateFilter;
};

export default useFilter;
