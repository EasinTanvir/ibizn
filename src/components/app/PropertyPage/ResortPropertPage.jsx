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
import ResortAndPrice from "./Itinerary/PackageAndPrice";
// import SwipeBoard from "@/src/components/app/PropertyPage/SwipeBoard";

function ResortProperyPage({ rid }) {
  const [propertyData, setPropertyData] = useState({});
  console.log(propertyData);
  console.log(rid);

  useEffect(() => {
    fetch(`${baseUrl}/resorts/single-resort/${rid}`)
      .then((res) => res.json())
      .then((data) => setPropertyData(data.data));
  }, [rid]);
  return (
    <>
      <Liveaboards propertyData={propertyData} />
      <div>
        <div className="">
          <LiveaboardDetails resort={true} propertyData={propertyData} />
          <div className="swipeboard">
            <SwipeBoard propertyData={propertyData} />
          </div>
          <div id="accommodation">
            <Accommodation resort={true} propertyData={propertyData} />
          </div>
        </div>

        <div id="facilities">
          <Facilities propertyData={propertyData} />
        </div>

        <div className="">
          <div className="px-4 lg:px-0" id="food">
            <Food resort={true} propertyData={propertyData} />
          </div>
          <div className="bg-[#F1F2F2] py-20 px-4 lg:px-0" id="scuba">
            <Scuba propertyData={propertyData} />
          </div>
          <div className="py-6" id="exclusions">
            <Exclusions />
          </div>
          <div className="bg-[#F1F2F2] py-20 px-4 lg:px-0">
            <EnvironmentelPacket resort={true} propertyData={propertyData} />
          </div>
          <div id="itinerariesandprices">
            <ResortAndPrice propertyData={propertyData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResortProperyPage;
