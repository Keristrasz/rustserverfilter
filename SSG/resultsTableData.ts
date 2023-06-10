import { FilterType, SorterType } from "@/utils/typesTypescript";
import { GetStaticProps } from "next";
import { fetchAllServers } from "@/utils/fetchAllServers";
import * as Realm from "realm-web";

export const resultsTableDataStaticProps: GetStaticProps = async () => {
  // Fetch initialSorter and initialFilter from an API or any other data source
  const initialSorter: SorterType = { players: -1 };
  const initialFilter: FilterType = {
    $and: [
      { rank: { $gte: 50 } },
      { rank: { $gte: 25 } },
      { players: { $gte: 20 } },
      { wipe_rotation: { $in: ["weekly", "biweekly", "monthly"] } },
    ],
  };
  const app = await Realm.getApp(process.env.NEXT_PUBLIC_APP_ID || "");
  const data = await fetchAllServers(initialFilter, initialSorter, 0, 30, app);
  "staticprops" + data;
  return {
    props: {
      data,
    },
  };
};
