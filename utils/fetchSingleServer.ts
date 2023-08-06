const fetchSingleServer = async (app: any, ip: string) => {
  const query = {
    addr: ip,
  };

  const projection = {
    gametype: 0,
    _id: 0,
  };

  const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
  if (!mongodb) return;

  const collection = mongodb.db("cluster6").collection("serverprimarycollections");

  const result = await collection.findOne(query, { projection });

  return result;
};

export default fetchSingleServer;
