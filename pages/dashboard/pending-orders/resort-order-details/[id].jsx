import ResortOrderDetails from "@/src/components/app/Dashboard/PendingOrders/PendingResortOrder/ResortOrderDetails";
import { useParams } from "next/navigation";
import React from "react";

const index = () => {
  const params = useParams();

  return <ResortOrderDetails id={params?.id}></ResortOrderDetails>;
};

export default index;
