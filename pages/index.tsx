import React, { useState, useEffect } from "react";
import {
  userLocationType,
  SorterType,
  FilterType,
  ServerPrimaryDataType,
  QueryResponseType,
} from "../utils/typesTypescript";
import useUserAuth from "../hooks/useUserAuth";
import useGeolocation from "@/hooks/useGeolocation";

import ResultsTable from "@/components/HOC/ResultsTable";
import Form from "@/components/HOC/Form";
import BodyWrapper from "@/components/layout/BodyWrapper";
import Heading from "@/components/UI/Heading";
import { InfiniteData } from "@tanstack/react-query";

//TODO Distance sort by loaded initialData

import { fetchAllServers } from "@/utils/fetchAllServers";
import * as Realm from "realm-web";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  // Fetch initialSorter and initialFilter from an API or any other initialData source
  console.log("staticprops1");
  const initialSorter: SorterType = { players: -1 };
  const initialFilter: FilterType = {
    $and: [{ rank: { $gte: 500 } }, { players: { $gte: 20 } }],
  };
  console.log("staticprops2");
  const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID || "");
  if (app && !app.currentUser) {
    console.log("app && !app.currentUser");
    const anonymousUser = Realm.Credentials.anonymous();
    await app.logIn(anonymousUser);
  }
  console.log("staticprops3");

  const _initialData: QueryResponseType = await fetchAllServers(
    initialFilter,
    initialSorter,
    0,
    30,
    app
  );

  const initialData = {
    pages: [_initialData],
  };

  return {
    props: {
      initialData,
    },
    // revalidate: 60, // Re-generate the page every 60 seconds (optional)
  };
};

// Helper function to get initialData from local storage
const getFromLocalStorage = (key: string, defaultValue: any): any => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  } else {
    return defaultValue;
  }
};

// Helper function to save initialData to local storage
const saveToLocalStorage = (key: string, value: any): void => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

interface HomeProps {
  // initialSorter: SorterType | {};
  // initialFilter: FilterType;
  initialData: InfiniteData<QueryResponseType>;
}

function Home({ initialData }: HomeProps) {
  console.log("rerender");
  const app = useUserAuth();

  const [sorter, setSorter] = useState<SorterType | {}>(getFromLocalStorage("sorter", {}));
  const [filter, setFilter] = useState<FilterType>(
    getFromLocalStorage("filter", {
      $and: [{ rank: { $gte: 50 } }],
    })
  );

  useEffect(() => {
    saveToLocalStorage("sorter", sorter);
  }, [sorter]);

  useEffect(() => {
    saveToLocalStorage("filter", filter);
  }, [filter]);

  const [userLocation, setUserLocation] = useState<userLocationType | null>(null);
  useGeolocation(userLocation, setUserLocation);

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
        initialData={initialData}
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

// //TODO Distance sort by loaded initialData

// // Helper function to get initialData from local storage
// const getFromLocalStorage = (key: string, defaultValue: any): any => {
//   if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
//     const storedValue = localStorage.getItem(key);
//     return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
//   } else {
//     return defaultValue;
//   }
// };

// // Helper function to save initialData to local storage
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
