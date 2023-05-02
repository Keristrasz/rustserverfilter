import SearchResults from "@/components/SearchResults";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface ServerData {
  data: {
    type: string;
    id: string;
    attributes: {
      id: string;
      name: string;
      address: string | null;
      ip: string;
      port: number;
      players: number;
      maxPlayers: number;
      rank: number;
      location: [number, number];
      status: string;
      details: {
        [key: string]: any;
        reckoning: {
          day: number;
          hour: number;
          minute: number;
        }[];
      };
      private: boolean;
      createdAt: string;
      updatedAt: string;
      portQuery: number;
      country: string;
      queryStatus: string;
    };
    relationships: {
      game: {
        data: {
          type: string;
          id: string;
        };
      };
      serverGroup?: {
        meta: {
          [key: string]: any;
        };
        data: {
          type: string;
          id: string;
        };
      };
    };
  }[];
}

let url = "https://api.battlemetrics.com/servers?filter[game]=rust";

function Home() {
  const [search, setSearch] = useState("");
  const [minPlayers, setMinPlayers] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [maxDistance, setMaxDistance] = useState("");
  const [playerCount, setPlayerCount] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [excludeCountries, setExcludeCountries] = useState<string[]>([]);

  const [results, setResults] = useState<ServerData>();

  console.log("index render");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleMinPlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPlayers(event.target.value);
  };

  const handleMaxPlayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPlayers(event.target.value);
  };

  const handleMaxDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDistance(event.target.value);
  };

  const handlePlayerCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(event.target.value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const country = event.target.value;
    if (countries.includes(country)) {
      setCountries(countries.filter((c) => c !== country));
    } else {
      setCountries([...countries, country]);
    }
  };

  const allCountries = ["USA", "GERMANY", "CHINA", "RUSSIA"];

  const handleExcludeCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const country = event.target.value;
    if (excludeCountries.includes(country)) {
      setExcludeCountries(excludeCountries.filter((c) => c !== country));
    } else {
      setExcludeCountries([...excludeCountries, country]);
    }
  };

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getData.refetch();
  };

  const fetchData = () => fetch(url).then((res) => res.json());

  const getData = useQuery({
    queryKey: ["searchResults"],
    queryFn: fetchData,
    staleTime: 30000, // set stale time to 30 seconds
    // enabled: false,
  });

  let renderAllResults;

  if (getData.isLoading) renderAllResults = <div>Loading...</div>;

  if (getData.error instanceof Error)
    renderAllResults = <div>An error has occurred: {getData.error.message}</div>;

  if (getData.status === "success")
    renderAllResults = (
      <div className="overflow-x-auto max-w-[53rem]">
        <h2 className="text-xl font-bold mb-2">Results</h2>
        <button
          disabled={getData.isFetching}
          onClick={() => {
            console.log(getData.data.links.next);
            url = getData.data.links.next;
            getData.refetch();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
        {getData.data.links.prev && (
          <button
            disabled={getData.isFetching}
            onClick={() => {
              console.log(getData.data.links.prev);
              url = getData.data.links.prev;
              getData.refetch();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Prev
          </button>
        )}
        <table className="table-fixed w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-1/4 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="w-1/4 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="w-1/4 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP
              </th>
              <th className="w-1/4 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Players
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getData.data?.data.map((result) => (
              <tr key={result.id}>
                <td className="w-1/4 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {result.id}
                </td>
                <td className="w-1/4 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {result.attributes.name}
                </td>
                <td className="w-1/4 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {result.attributes.ip}
                </td>
                <td className="w-1/4 px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {result.attributes.players}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-100 rounded-lg p-6 space-y-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
            <label htmlFor="search" className="block text-gray-700 font-medium mb-2">
              Search
            </label>
            <input
              id="search"
              type="text"
              className="form-input rounded-md shadow-sm mt-1 block w-full"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
            <label htmlFor="minPlayers" className="block text-gray-700 font-medium mb-2">
              Players
            </label>
            <div className="flex items-center">
              <input
                id="minPlayers"
                type="number"
                className="form-input rounded-md shadow-sm mt-1 block w-1/2 mr-2"
                value={minPlayers}
                onChange={handleMinPlayersChange}
              />
              <input
                id="maxPlayers"
                type="number"
                className="form-input rounded-md shadow-sm mt-1 block w-1/2"
                value={maxPlayers}
                onChange={handleMaxPlayersChange}
              />
            </div>
          </div>
          <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 mb-4 sm:mb-0">
            <label htmlFor="maxDistance" className="block text-gray-700 font-medium mb-2">
              Max. distance
            </label>
            <input
              id="maxDistance"
              type="number"
              className="form-input rounded-md shadow-sm mt-1 block w-full"
              value={maxDistance}
              onChange={handleMaxDistanceChange}
            />
          </div>
        </div>
        <div>
          <fieldset>
            <legend className="block text-gray-700 font-medium mb-2">Group size</legend>
            {/* <div className="flex flex-wrap">
              {groupSizeOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center mr-4 mb-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    value={option.value}
                    checked={groupSize === option.value}
                    onChange={() => setGroupSize(option.value)}
                  />
                  <span className="ml-2 text-gray-700">{option.label}</span>
                </label>
              ))}
            </div> */}
          </fieldset>
          <fieldset>
            <legend className="block text-gray-700 font-medium mb-2">Player count</legend>
            <div className="flex items-center">
              <input
                id="playerCount"
                type="number"
                className="form-input rounded-md shadow-sm mt-1 block w-full"
                value={playerCount}
                onChange={handlePlayerCountChange}
              />
            </div>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend className="block text-gray-700 font-medium mb-2">Countries</legend>
            <div className="flex flex-wrap">
              {allCountries.map((country) => (
                <label key={country} className="flex items-center mr-4 mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    value={country}
                    checked={countries.includes(country)}
                    onChange={handleCountryChange}
                  />
                  <span className="ml-2 text-gray-700">{country}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend className="block text-gray-700 font-medium mb-2">Exclude Countries</legend>
            <div className="flex flex-wrap">
              {allCountries.map((country) => (
                <label key={country} className="flex items-center mr-4 mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    value={country}
                    checked={excludeCountries.includes(country)}
                    onChange={handleExcludeCountryChange}
                  />
                  <span className="ml-2 text-gray-700">{country}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <button
          type="submit"
          disabled={getData.isFetching}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </form>

      {renderAllResults}
    </div>
  );
}

export default Home;
