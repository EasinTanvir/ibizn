import React, { useContext, useEffect, useState } from "react";
import Banner from "./banner/Banner";
import Filtering from "./allFiltering/Filtering";
import FindCard from "./findCard/FindCard";
import { userContext } from "@/src/storage/contextApi";
import { baseUrl } from "@/src/config/serverConfig";
import { Blocks, RotatingLines } from "react-loader-spinner";

const SecondPage = () => {
  const { searchValues } = useContext(userContext);
  // console.log(searchValues);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  console.log(searchResult);
  useEffect(() => {
    setIsLoading(true);
    const objectToQueryString = (obj) => {
      const queryString = Object.keys(obj)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
        )
        .join("&");
      return queryString;
    };

    // Construct the query string from searchValues
    const queryString = objectToQueryString(searchValues);
    console.log(queryString);
    fetch(
      `${baseUrl}/${
        searchValues?.tabValue === "Resorts" ||
        searchValues?.property === "resort"
          ? "resorts/all-resorts"
          : "boats/all-boats"
      }?${queryString}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, [searchValues]);

  const [sortedLists, setSortedLists] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  const sortListHandler = () => {
    const sorted = [...sortedLists].sort((a, b) => {
      if (isAscending) {
        return a.veganRating - b.veganRating;
      } else {
        return b.veganRating - a.veganRating;
      }
    });
    setSortedLists(sorted);
    setIsAscending(!isAscending);
  };

  useEffect(() => {
    setSortedLists(searchResult);
  }, [searchResult]);

  return (
    <div>
      <Banner setSearchResult={setSearchResult} />

      {!isLoading ? (
        <div>
          <Filtering sortListHandler={sortListHandler} />
          <FindCard
            resort={
              searchValues?.tabValue === "Resorts" ||
              searchValues?.property === "resort"
            }
            searchResult={sortedLists}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="min-h-72 flex justify-center items-center">
          <div className="flex flex-col">
            <Blocks
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
            />
            <span className="font-semibold">Please Wait...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecondPage;
