//   bm_id_url = "https://api.battlemetrics.com/players/match"
//   data = '{"method" : "post","contentType" : "application/json","headers" : {"Authorizaion": "Bearer %s"}, "data" : [{"type" : "identifier","attributes" : {"type" : "steamID","identifier" :"%s"}}]}' % (BMkey,steamID)
//   bm = requests.post(bm_id_url, headers=bmheader, data=data)
// print(json.loads(bm.text)['data'])

// class BM {
//   /**
//   * Creates an instance of BM.
//   * @param {Object} [options={}]
//   * @memberof BM
//   */
//   constructor(options = {}){
//       this.axios = require("axios");
//       this.axios.defaults.headers.common["Authorization"] = "Bearer " + options.token;
//       this.axios.defaults.baseURL = "https://api.battlemetrics.com";
//       this.axios.defaults.headers.post["Content-Type"] = "application/json";
//       this.token = options.token;
//       this.serverID = options.serverID;
//       this.game = options.game;
//   }

//   getAllServersByServerNameCountryAndGame(serverName, country, game=this.game, pageLength=10) {
//     return new Promise((resolve, reject) => {
//         let info = [];
//         this.axios.get(`/servers?filter[search]="${serverName}&filter[game]=${game}&filter[countries][]=${country}&page[size]=${pageLength}`).then(res => {
//             const servers = res.data.data;
//             if(!servers) {
//                 reject(Error("Unable to fetch the data."));
//             }
//             servers.forEach((server) => {
//                 const attributes = server.attributes;
//                 if(attributes) {
//                     info.push(attributes);
//                 }
//             });
//             resolve(info);
//         }).catch(reject);
//     });
// }

// const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   // const url = `https://yourapi.com/search?search=${search}&min_players=${minPlayers}&max_players=${maxPlayers}&max_distance=${maxDistance}&player_count=${playerCount}&countries=${countries.join(
//   //   ","
//   // )}&exclude_countries=${excludeCountries.join(",")}`;
//   const url = `https://api.battlemetrics.com/servers`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//     setResults(data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// axios.get('https://www.example.com/search', {
//   params: {
//     q: 'axios',
//     page: 2
//   }
// })
//   .then(response => {
//     // handle success
//   })
//   .catch(error => {
//     // handle error
//   });

//   const params = new URLSearchParams([['answer', 42]]);

// const res = await axios.get('https://httpbin.org/get', { params });

// const url = `https://api.battlemetrics.com/servers`;
// const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//     setResults(data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// function Example() {
//   const { isLoading, error, data } = useQuery({
//     queryKey: ['repoData'],
//     queryFn: () =>
//       fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
//         (res) => res.json(),
//       ),
//   })

//   if (isLoading) return 'Loading...'

//   if (error) return 'An error has occurred: ' + error.message

//   return (
//     <div>
//       <h1>{data.name}</h1>
//       <p>{data.description}</p>
//       <strong>👀 {data.subscribers_count}</strong>{' '}
//       <strong>✨ {data.stargazers_count}</strong>{' '}
//       <strong>🍴 {data.forks_count}</strong>
//     </div>
//   )
// }
