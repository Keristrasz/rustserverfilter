import { FilterType } from "@/utils/typesTypescript";

type UseFilterHook = {
  updateFilter: (
    wipeRotation: string | null,
    minPlayers: string | null,
    maxPlayers: string | null,
    minSize: string | null,
    maxSize: string | null,
    searchName: string | null,
    maxGroupSize: string[],
    rate: string[],
    includedCountries: string[],
    excludedCountries: string[],
    maxDistance: string | null,
    userLocation: { latitude: number; longitude: number } | null
  ) => void;
};

const useFilter = (
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>
): UseFilterHook => {
  const updateFilter = (
    wipeRotation: string | null,
    minPlayers: string | null,
    maxPlayers: string | null,
    minSize: string | null,
    maxSize: string | null,
    searchName: string | null,
    maxGroupSize: string[],
    rate: string[],
    includedCountries: string[],
    excludedCountries: string[],
    maxDistance: string | null,
    userLocation: { latitude: number; longitude: number } | null
  ) => {
    let newFilter: FilterType = {
      $and: [{ rank: { $gte: 50 } }],
    };

    wipeRotation ? newFilter.$and.push({ wipe_rotation: wipeRotation }) : null;
    minPlayers ? newFilter.$and.push({ players: { $gte: Number(minPlayers) } }) : null;
    maxPlayers ? newFilter.$and.push({ players: { $lte: Number(maxPlayers) } }) : null;
    minSize ? newFilter.$and.push({ "rules.size": { $gte: Number(minSize) } }) : null;
    maxSize ? newFilter.$and.push({ "rules.size": { $lte: Number(maxSize) } }) : null;
    searchName ? newFilter.$and.push({ name: { $regex: searchName, $options: "i" } }) : null;
    maxGroupSize.length !== 0
      ? newFilter.$and.push({ max_group_size: { $in: maxGroupSize } })
      : null;
    rate.length !== 0 ? newFilter.$and.push({ rate: { $in: rate } }) : null;
    includedCountries.length !== 0 && excludedCountries.length === 0
      ? newFilter.$and.push({ "rules.location.country": { $in: includedCountries } })
      : null;
    excludedCountries.length !== 0 && includedCountries.length === 0
      ? newFilter.$and.push({ "rules.location.country": { $nin: excludedCountries } })
      : null;
    includedCountries.length !== 0 && excludedCountries.length !== 0
      ? alert("There can be only included or excluded countries at once")
      : null;

    maxDistance && userLocation
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

    console.log(newFilter);
    setFilter(newFilter);
  };

  return { updateFilter };
};

export default useFilter;
