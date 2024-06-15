import BoatOrderDetails from "@/src/components/app/Dashboard/PendingOrders/PendingBoatOrder/BoatOrderDetails";
import { useParams } from "next/navigation";
import React from "react";

const index = () => {
  const params = useParams();
  console.log(params?.id);
  return <BoatOrderDetails id={params?.id}></BoatOrderDetails>;
};

export default index;
