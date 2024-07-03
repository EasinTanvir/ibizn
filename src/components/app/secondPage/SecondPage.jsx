import React, { useContext, useEffect, useState } from "react";
import Banner from "./banner/Banner";
import Filtering from "./allFiltering/Filtering";
import FindCard from "./findCard/FindCard";
import { userContext } from "@/src/storage/contextApi";
import { baseUrl } from "@/src/config/serverConfig";
import { RotatingLines } from "react-loader-spinner";

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
  return (
    <div>
      <Banner setSearchResult={setSearchResult} />

      {!isLoading ? (
        <div>
          <Filtering />
          <FindCard
            resort={
              searchValues?.tabValue === "Resorts" ||
              searchValues?.property === "resort"
            }
            searchResult={searchResult}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="h-[300px] flex justify-center py-5">
          <RotatingLines
            visible={true}
            height="80"
            width="80"
            color="#0080ff"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </div>
  );
};

export default SecondPage;
