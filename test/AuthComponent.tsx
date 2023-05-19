const auth = async () => {
  const app = Realm.getApp(process.env.NEXT_PUBLIC_APP_ID);
  if (app && !app.currentUser) {
    console.log("app && !app.currentUser");
    const anonymousUser = Realm.Credentials.anonymous();
    await app.logIn(anonymousUser);
  }
  return app;
};

const fetchData = async (filter, sorter, projection) => {
  const app = await auth();
  console.log("fetching data", app);

  const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
  if (!mongodb) return;

  const collection = mongodb.db("cluster6").collection("serverprimarycollections");
  const document = await collection.find(filter, {
    projection,
    sort: sorter,
    limit: 30,
  });

  console.log(document);
  return document;
};

const MyComponent = () => {
  const [filter, setFilter] = useState("");
  const [sorter, setSorter] = useState("");
  const [projection, setProjection] = useState("");
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateFilter();
  };

  const queryClient = useQueryClient();

  const getData = useQuery({
    queryKey: ["searchResults", filter, sorter, projection],
    queryFn: () => fetchData(filter, sorter, projection),
    enabled: !!queryClient.getQueryData(["userAuth"]),
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  useEffect(() => {
    const fetchAuth = async () => {
      await queryClient.prefetchQuery("userAuth", auth);
    };

    fetchAuth();
  }, [queryClient]);

  // Render the component
};