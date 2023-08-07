import { SorterType, FilterType } from "./typesTypescript";

type PipelineType = {
  $project?: {
    [field: string]: 0 | 1;
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

type Projection = {
  $project: {
    [key: string]: 0 | 1;
  };
};

export const fetchAllServers = async (
  filter: FilterType,
  sorter: SorterType,
  pageParam: number,
  pageSize: number,
  app: any,
  projection?: Projection
) => {
  const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
  if (!mongodb) return;

  const collection = mongodb.db("cluster6").collection("serverprimarycollections");

  let pipeline: PipelineType = [
    {
      $match: filter,
    },
    projection || {
      $project: {
        difficulty: 0,
        gameport: 0,
        gametype: 0,
        max_players: 0,
        modded: 0,
        players_history: 0,
        "rules.url": 0,
        "rules.seed": 0,
        "rules.fpv_avg": 0,
        "rules.uptime": 0,
        vanilla: 0,
        _id: 0,
      },
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
    pipeline.splice(0, 0, {
      $sort: sorter,
    });
  }

  const [result] = await collection.aggregate(pipeline, { allowDiskUse: true });
  return result;
};
