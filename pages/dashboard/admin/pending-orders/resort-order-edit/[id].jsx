import ResortEdit from "@/src/components/app/Dashboard/admin/PendingOrders/Edit/BoatEdit/ResortEdit";
import { useParams } from "next/navigation";
import React from "react";

const ResortOrderEdit = () => {
  const params = useParams();
  return <ResortEdit id={params?.id} />;
};

export default ResortOrderEdit;
