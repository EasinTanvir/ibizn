import React, { useEffect, useState } from "react";
import Liveaboards from "./Liveaboards";
import LiveaboardDetails from "./LiveaboardDetails";
import Accommodation from "./Accommodation";
import Facilities from "./Facilities";
import Food from "./Food";
import Scuba from "./Scuba";
import Exclusions from "./Exclusions";
import EnvironmentelPacket from "./EnvironmentelPacket";
import SwipeBoard from "./SwipeBoard";
import { baseUrl } from "@/src/config/serverConfig";
import Itineraries from "../Dashboard/Boat/Itineraries";
import ItinerariesAndPrices from "./Itinerary/ItinerariesAndPrices";
import { Blocks } from "react-loader-spinner";
// import SwipeBoard from "@/src/components/app/PropertyPage/SwipeBoard";

function PropertyPage({ id }) {
  const [propertyData, setPropertyData] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    if (id) {
      fetch(`${baseUrl}/boats/single-boat/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPropertyData(data.data);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  }, [id]);
  return (
    <>
      {loader ? (
        <div className="min-h-[calc(100vh-70px)] flex justify-center items-center">
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
      ) : (
        <>
          <Liveaboards propertyData={propertyData} />
          <div>
            <div className="">
              <LiveaboardDetails propertyData={propertyData} />
              <div className="swipeboard">
                <SwipeBoard propertyData={propertyData} />
              </div>
              <div id="accommodation">
                <Accommodation propertyData={propertyData} />
              </div>
            </div>

            <div id="facilities">
              <Facilities propertyData={propertyData} />
            </div>

            <div className="">
              <div className="px-4 lg:px-0" id="food">
                <Food propertyData={propertyData} />
              </div>
              <div className="bg-[#F1F2F2] py-20 px-4 lg:px-0" id="scuba">
                <Scuba propertyData={propertyData} />
              </div>
              <div className="py-6" id="exclusions">
                <Exclusions />
              </div>
              <div className="bg-[#F1F2F2] py-20 px-4 lg:px-0">
                <EnvironmentelPacket propertyData={propertyData} />
              </div>
              <div id="itinerariesandprices">
                <ItinerariesAndPrices propertyData={propertyData} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PropertyPage;
