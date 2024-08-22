//import PropertyPage from "@/src/components/app/PropertyPage/PropertyPage";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

import { Blocks } from "react-loader-spinner";
const PropertyPage = dynamic(
  () => import("@/src/components/app/PropertyPage/PropertyPage"),
  {
    ssr: false,
    loading: () => (
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
    ),
  }
);

const propertyPage = () => {
  const params = useParams();

  return <PropertyPage id={params?.id} />;
};

export default propertyPage;
