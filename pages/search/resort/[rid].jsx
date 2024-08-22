import dynamic from "next/dynamic";
import { Blocks } from "react-loader-spinner";
const ResortProperyPage = dynamic(
  () => import("@/src/components/app/PropertyPage/ResortPropertPage"),
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

//import ResortProperyPage from "@/src/components/app/PropertyPage/ResortPropertPage";
import { useParams } from "next/navigation";

const propertyPage = () => {
  const params = useParams();

  return <ResortProperyPage rid={params?.rid} />;
};

export default propertyPage;
