import React, { useState, useEffect } from "react";
import { userLocationType, SorterType, FilterType } from "../utils/typesTypescript";
import useUserAuth from "../hooks/useUserAuth";
import useGeolocation from "@/hooks/useGeolocation";

import ResultsTable from "@/components/HOC/ResultsTable";
import Form from "@/components/HOC/Form";
import BodyWrapper from "@/components/layout/BodyWrapper";
import Heading from "@/components/UI/Heading";

//TODO Distance sort by loaded data

// Helper function to get data from local storage
const getFromLocalStorage = (key: string, defaultValue: any): any => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  } else {
    return defaultValue;
  }
};

// Helper function to save data to local storage
const saveToLocalStorage = (key: string, value: any): void => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

function Home() {
  console.log("rerender");
  const app = useUserAuth();

  const [sorter, setSorter] = useState<SorterType | {}>(
    getFromLocalStorage("sorter", {})
  );
  const [filter, setFilter] = useState<FilterType>(
    getFromLocalStorage("filter", {
      $and: [{ rank: { $gte: 50 } }],
    })
  );

  const [userLocation, setUserLocation] = useState<userLocationType | null>(null);
  useGeolocation(userLocation, setUserLocation);

  useEffect(() => {
    saveToLocalStorage("sorter", sorter);
  }, [sorter]);

  useEffect(() => {
    saveToLocalStorage("filter", filter);
  }, [filter]);

  return (
    <BodyWrapper>
      {/* <Heading /> */}
      <Form
        userLocation={userLocation}
        setFilter={setFilter}
        setSorter={setSorter}
        filter={filter}
        sorter={sorter}
      />
      <ResultsTable
        app={app}
        filter={filter}
        sorter={sorter}
        setFilter={setFilter}
        setSorter={setSorter}
        userLocation={userLocation}
      />
    </BodyWrapper>
  );
}

export default Home;

// import React, { useState, useEffect } from "react";
// import { userLocationType, SorterType, FilterType } from "../utils/typesTypescript";
// import useUserAuth from "../hooks/useUserAuth";
// import useGeolocation from "@/hooks/useGeolocation";
// import { GetStaticProps } from "next";
// import ResultsTable from "@/components/HOC/ResultsTable";
// import Form from "@/components/HOC/Form";
// import BodyWrapper from "@/components/layout/BodyWrapper";
// import Heading from "@/components/UI/Heading";

// //TODO Distance sort by loaded data

// // Helper function to get data from local storage
// const getFromLocalStorage = (key: string, defaultValue: any): any => {
//   if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
//     const storedValue = localStorage.getItem(key);
//     return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
//   } else {
//     return defaultValue;
//   }
// };

// // Helper function to save data to local storage
// const saveToLocalStorage = (key: string, value: any): void => {
//   if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
//     localStorage.setItem(key, JSON.stringify(value));
//   }
// };

// export const getStaticProps: GetStaticProps = async () => {
//   const initialSorter = getFromLocalStorage("sorter", {});
//   const initialFilter = getFromLocalStorage("filter", {});

//   return {
//     props: {
//       initialSorter,
//       initialFilter,
//     },
//   };
// };

// interface HomeProps {
//   initialSorter: SorterType | {};
//   initialFilter: FilterType;
// }

// function Home({ initialSorter, initialFilter }: HomeProps) {
//   console.log("rerender");
//   const app = useUserAuth();

//   // const [sorter, setSorter] = useState<SorterType | {}>(
//   //   getFromLocalStorage("sorter", {})
//   // );
//   // const [filter, setFilter] = useState<FilterType>(
//   //   getFromLocalStorage("filter", {
//   //     $and: [{ rank: { $gte: 50 } }],
//   //   })
//   // );

//   const [sorter, setSorter] = useState<SorterType | {}>(initialSorter);
//   const [filter, setFilter] = useState<FilterType>(initialFilter);

//   const [userLocation, setUserLocation] = useState<userLocationType | null>(null);
//   useGeolocation(userLocation, setUserLocation);

//   useEffect(() => {
//     saveToLocalStorage("sorter", sorter);
//   }, [sorter]);

//   useEffect(() => {
//     saveToLocalStorage("filter", filter);
//   }, [filter]);

//   // Update local storage when values change
//   const handleSortChange = (value) => {
//     setSorter(value);
//     saveToLocalStorage("sorter", value);
//   };

//   const handleFilterChange = (value) => {
//     setFilter(value);
//     saveToLocalStorage("filter", value);
//   };

//   return (
//     <BodyWrapper>
//       {/* <Heading /> */}
//       <Form
//         userLocation={userLocation}
//         setFilter={setFilter}
//         setSorter={setSorter}
//         filter={filter}
//         sorter={sorter}
//       />
//       <ResultsTable
//         app={app}
//         filter={filter}
//         sorter={sorter}
//         setFilter={setFilter}
//         setSorter={setSorter}
//         userLocation={userLocation}
//       />
//     </BodyWrapper>
//   );
// }

// export default Home;
