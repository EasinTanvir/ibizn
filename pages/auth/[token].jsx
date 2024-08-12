import PasswordUpdate from "@/src/components/app/Auth/PasswordUpdate";
import { useParams } from "next/navigation";
import React from "react";

const Token = () => {
  const token = useParams()?.token;
  console.log(token);
  return (
    <>
      <PasswordUpdate token={token} />
    </>
  );
};

export default Token;
