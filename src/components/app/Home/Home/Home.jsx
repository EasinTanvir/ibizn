import React, { useContext, useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import SpecialOffer from "../specialOffer/SpecialOffer";
import BestBoard from "./../bestOfThisMounthBoard/Bestboard";
import WhyDeeparture from "./../whyDeeparture/WhyDeeparture";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";

const Home = () => {
  const [isPropertyShow, setIsPropertyShow] = useState(false);

  return (
    <div className="space-y-16">
      <Banner />
      <SpecialOffer />
      <BestBoard />
      <div style={{ marginTop: "0px" }}>
        <WhyDeeparture />
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default Home;
