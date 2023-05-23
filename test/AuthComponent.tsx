// const auth = async () => {
//   const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID);
//   if (app && !app.currentUser) {
//     console.log("app && !app.currentUser");
//     const anonymousUser = Realm.Credentials.anonymous();
//     await app.logIn(anonymousUser);
//   }
//   return app;
// };

// const fetchData = async (filter, sorter, projection) => {
//   const app = await auth();
//   console.log("fetching data", app);

//   const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
//   if (!mongodb) return;

//   const collection = mongodb.db("cluster6").collection("serverprimarycollections");
//   const document = await collection.find(filter, {
//     projection,
//     sort: sorter,
//     limit: 30,
//   });

//   console.log(document);
//   return document;
// };

// const MyComponent = () => {
//   const [filter, setFilter] = useState("");
//   const [sorter, setSorter] = useState("");
//   const [projection, setProjection] = useState("");

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     updateFilter();
//   };

//   const queryClient = useQueryClient();

//   const getData = useQuery({
//     queryKey: ["searchResults", filter, sorter, projection],
//     queryFn: () => fetchData(filter, sorter, projection),
//     enabled: !!queryClient.getQueryData(["userAuth"]),
//     refetchOnWindowFocus: false, // Disable refetching on window focus
//   });

//   useEffect(() => {
//     const fetchAuth = async () => {
//       await queryClient.prefetchQuery("userAuth", auth);
//     };

//     fetchAuth();
//   }, [queryClient]);

//   // Render the component
// };

// ("use client");
// import { useState } from "react";
// import { groupSizeOptions, ratesOptions, wipeRatesOptions } from "@/utils/inputData";
// import SelectCountries from "./SelectCountries";
// import useFilter from "@/hooks/useFilter";
// import { userLocationType, SorterType, FilterType } from "../utils/typesTypescript";

// type FormProps = {
//   userLocation: userLocationType | null;
//   setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
//   setSorter: React.Dispatch<React.SetStateAction<SorterType | {}>>;
// };

// const Form: React.FC<FormProps> = ({ userLocation, setFilter, setSorter }) => {
//   const [wipeRotation, setWipeRotation] = useState<string[]>([]);
//   const [excludedCountries, setExcludeCountries] = useState<string[]>([]);
//   const [includedCountries, setIncludedCountries] = useState<string[]>([]);
//   const [minSize, setMinSize] = useState<number | string>("");
//   const [maxSize, setMaxSize] = useState<number | string>("");
//   const [minPlayers, setMinPlayers] = useState<number | string>("");
//   const [maxPlayers, setMaxPlayers] = useState<number | string>("");
//   const [searchName, setSearchName] = useState<string>("");
//   const [maxGroupSize, setMaxGroupSize] = useState<number[]>([]);
//   const [maxDistance, setMaxDistance] = useState<number | string>("");
//   const [rate, setRate] = useState<number[]>([]);

//   const [buttonsDisabled, setButtonsDisabled] = useState(false);

//   const { updateFilter } = useFilter(setFilter);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchName(event.target.value);
//   };

//   const handleMinPlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setMinPlayers(value === "" ? "" : Number(value));
//   };

//   const handleMaxPlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setMaxPlayers(value === "" ? "" : Number(value));
//   };

//   const handleMinSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setMinSize(value === "" ? "" : Number(value));
//   };

//   const handleMaxSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setMaxSize(value === "" ? "" : Number(value));
//   };

//   const handleMaxDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setMaxDistance(value === "" ? "" : Number(value));
//   };

//   const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const numberValue = Number(event.target.value);
//     if (rate.includes(numberValue)) {
//       setRate(rate.filter((c) => c !== numberValue));
//     } else {
//       setRate([...rate, numberValue]);
//     }
//   };

//   const handleGroupSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const numberValue = Number(event.target.value);
//     if (maxGroupSize.includes(numberValue)) {
//       setMaxGroupSize(maxGroupSize.filter((c) => c !== numberValue));
//     } else {
//       setMaxGroupSize([...maxGroupSize, numberValue]);
//     }
//   };

//   const handleWipeRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     if (wipeRatesOptions.includes(value)) {
//       setWipeRotation(wipeRatesOptions.filter((c) => c !== value));
//     } else {
//       setWipeRotation([...wipeRatesOptions, value]);
//     }

//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//       event.preventDefault();
//       setButtonsDisabled(true);
//       updateFilter(
//         wipeRotation,
//         //@ts-ignore
//         minPlayers,
//         maxPlayers,
//         minSize,
//         maxSize,
//         searchName,
//         maxGroupSize,
//         rate,
//         includedCountries,
//         excludedCountries,
//         maxDistance,
//         userLocation
//       );
//       setTimeout(() => {
//         // Enable buttons after the delay
//         setButtonsDisabled(false);
//       }, 1000);
//     };

//     const handleResetForm = () => {
//       setButtonsDisabled(true);

//       setRate([]);
//       setMinPlayers("");
//       setMaxPlayers("");
//       setMinSize("");
//       setMaxSize("");
//       setSearchName("");
//       setWipeRotation([]);
//       setMaxGroupSize([]);
//       setMaxDistance("");
//       setExcludeCountries([]);
//       setIncludedCountries([]);
//       setSorter({});
//       setFilter({ $and: [{ rank: { $gte: 50 } }] });

//       setTimeout(() => {
//         // Enable buttons after the delay
//         setButtonsDisabled(false);
//       }, 1000);
//     };

//     return (
//       <form onSubmit={handleSubmit} className="bg-gray-100 rounded-lg p-6 space-y-6 m-4">
//         <div className="flex flex-wrap justify-between items-center">
//           <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
//             <label htmlFor="search" className="block text-gray-700 font-medium mb-2">
//               Search by name
//             </label>
//             <input
//               id="search"
//               type="text"
//               className="form-input rounded-md shadow-sm mt-1 block w-full"
//               value={searchName}
//               onChange={handleSearchChange}
//             />
//           </div>
//           <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
//             <label htmlFor="minPlayers" className="block text-gray-700 font-medium mb-2">
//               Players
//             </label>
//             <div className="flex items-center">
//               <input
//                 id="minPlayers"
//                 type="number"
//                 className="form-input rounded-md shadow-sm mt-1 block w-1/2 mr-2"
//                 value={minPlayers}
//                 onChange={handleMinPlayersChange}
//               />
//               <span className="text-gray-700">to</span>
//               <input
//                 id="maxPlayers"
//                 type="number"
//                 className="form-input rounded-md shadow-sm mt-1 block w-1/2 ml-2"
//                 value={maxPlayers}
//                 onChange={handleMaxPlayersChange}
//               />
//             </div>
//           </div>
//           <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
//             <label htmlFor="minPlayers" className="block text-gray-700 font-medium mb-2">
//               Size
//             </label>
//             <div className="flex items-center">
//               <input
//                 id="minSize"
//                 type="number"
//                 className="form-input rounded-md shadow-sm mt-1 block w-1/2 mr-2"
//                 value={minSize}
//                 onChange={handleMinSizeChange}
//               />
//               <span className="text-gray-700">to</span>
//               <input
//                 id="maxSize"
//                 type="number"
//                 className="form-input rounded-md shadow-sm mt-1 block w-1/2 ml-2"
//                 value={maxSize}
//                 onChange={handleMaxSizeChange}
//               />
//             </div>
//           </div>
//           <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
//             <label htmlFor="maxDistance" className="block text-gray-700 font-medium mb-2">
//               Max. distance
//             </label>
//             <input
//               id="maxDistance"
//               type="number"
//               className="form-input rounded-md shadow-sm mt-1 block w-full"
//               value={maxDistance}
//               onChange={handleMaxDistanceChange}
//             />
//           </div>
//         </div>
//         <div>
//           <fieldset className="mt-6">
//             <legend className="block text-gray-700 font-medium mb-2">Rates</legend>
//             <div className="flex flex-wrap">
//               {ratesOptions.map((el) => (
//                 <label key={el} className="flex items-center mr-4 mb-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="form-checkbox text-blue-600"
//                     value={el}
//                     checked={rate.includes(el)}
//                     onChange={handleRateChange}
//                   />
//                   <span className="ml-2 text-gray-700">{el}</span>
//                 </label>
//               ))}
//             </div>
//           </fieldset>
//           <fieldset className="mt-6">
//             <legend className="block text-gray-700 font-medium mb-2">Group size</legend>
//             <div className="flex flex-wrap">
//               {groupSizeOptions.map((option) => (
//                 <label
//                   key={option.value}
//                   className="flex items-center mr-4 mb-2 cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     className="form-checkbox text-blue-600"
//                     value={option.value}
//                     checked={groupSizeOptions.includes(option.value)}
//                     onChange={handleGroupSizeChange}
//                   />
//                   <span className="ml-2 text-gray-700">{option.label}</span>
//                 </label>
//               ))}
//             </div>
//           </fieldset>
//           <fieldset className="mt-6">
//             <legend className="block text-gray-700 font-medium mb-2">Wipe rate</legend>
//             <div className="flex flex-wrap">
//               {wipeRatesOptions.map((option) => (
//                 <label
//                   key={option}
//                   className="flex items-center mr-4 mb-2 cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     className="form-checkbox text-blue-600"
//                     value={option}
//                     checked={wipeRatesOptions.includes(option)}
//                     onChange={handleWipeRateChange}
//                   />
//                   <span className="ml-2 text-gray-700">{option}</span>
//                 </label>
//               ))}
//             </div>
//           </fieldset>
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">
//             Include Countries
//           </label>
//           <SelectCountries
//             countries={includedCountries}
//             setCountries={setIncludedCountries}
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">
//             Exclude Countries
//           </label>
//           <SelectCountries
//             countries={excludedCountries}
//             setCountries={setExcludeCountries}
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={buttonsDisabled}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Search
//         </button>
//         <button
//           type="button"
//           disabled={buttonsDisabled}
//           onClick={handleResetForm}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Reset
//         </button>
//       </form>
//     );
//   };
// };
// export default Form;
