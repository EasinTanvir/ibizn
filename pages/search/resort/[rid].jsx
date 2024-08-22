import ResortProperyPage from "@/src/components/app/PropertyPage/ResortPropertPage";
import { useParams } from "next/navigation";

const propertyPage = () => {
  const params = useParams();

  return <ResortProperyPage rid={params?.rid} />;
};

export default propertyPage;
