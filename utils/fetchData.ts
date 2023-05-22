import { SorterType, FilterType } from "../utils/typesTypescript";

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

export const fetchData = async (
  filter: FilterType,
  sorter: SorterType,
  pageParam: number,
  pageSize: number,
  app: any
) => {
  console.log("fetching data" + app);

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
    // {
    //   $sort: sorter,
    // },
    {
      $facet: {
        // rows: [
        //   {
        //     $skip: pageParam * pageSize || 0,
        //   },
        //   {
        //     $limit: pageSize,
        //   },
        // ],
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
    // {
    //   $set: {
    //     totalRows: {
    //       $arrayElemAt: ["$totalRows.totalDocs", 0],
    //     },
    //   },
    // },
  ];

  if (JSON.stringify(sorter) !== "{}") {
    pipeline.splice(2, 0, {
      $sort: sorter,
    });
  }

  console.log(JSON.stringify(sorter) === "{}", pipeline);
  const [result] = await collection.aggregate(pipeline);

  // const documents = result.rows;
  // const totalCount = result.totalRows;

  console.log(result);
  return result;
};
