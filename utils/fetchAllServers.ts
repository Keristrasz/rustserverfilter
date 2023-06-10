import { SorterType, FilterType } from "./typesTypescript";

type PipelineType = {
  $project?: {
    [field: string]: 0;
  };
  $match?: any;
  $facet?: {
    totalCount: [
      {
        $count: string;
      }
    ];
    result: [
      {
        $skip?: number;
      },
      {
        $limit: number;
      }
    ];
  };
  $set?: {
    totalRows: {
      $arrayElemAt: [string[], number];
    };
  };
  $sort?: any;
}[];

export const fetchAllServers = async (
  filter: FilterType,
  sorter: SorterType,
  pageParam: number,
  pageSize: number,
  app: any
) => {
  "fetching data" + app;

  const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
  if (!mongodb) return;

  const collection = mongodb.db("cluster6").collection("serverprimarycollections");

  let pipeline: PipelineType = [
    {
      $project: {
        gametype: 0,
        _id: 0,
        "rules.description": 0,
        "rules.url": 0,
        "rules.seed": 0,
        "rules.fpv_avg": 0,
        players_history: 0,
        gameport: 0,
      },
    },
    {
      $match: filter,
    },
    {
      $facet: {
        totalCount: [
          {
            $count: "totalCount",
          },
        ],
        result: [
          {
            $skip: pageParam * pageSize || 0,
          },
          {
            $limit: pageSize,
          },
        ],
      },
    },
  ];

  if (JSON.stringify(sorter) !== "{}") {
    pipeline.splice(2, 0, {
      $sort: sorter,
    });
  }

  const [result] = await collection.aggregate(pipeline, { allowDiskUse: true });
  return result;
};
