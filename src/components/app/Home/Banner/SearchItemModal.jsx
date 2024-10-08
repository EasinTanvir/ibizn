import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "@/src/config/serverConfig";
import { userContext } from "@/src/storage/contextApi";
import { Blocks } from "react-loader-spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  minHeight: "500px", // Minimum height for the element
  p: 5,
  "@media (max-width: 600px)": {
    width: "90%", // Width for devices with a maximum width of 600px (e.g., mobile phones)
  },
  "@media (min-width: 601px) and (max-width: 1024px)": {
    width: "70%", // Width for devices with a width between 601px and 1024px (e.g., tablets)
  },
  "@media (min-width: 1025px)": {
    width: 1000, // Width for devices with a minimum width of 1025px (e.g., desktops)
  },
};

export default function SearchItemModal({
  isModalOpen,
  setIsModalOpen,
  setDestination,
  destination,
}) {
  const handleClose = () => setIsModalOpen(false);
  const [searchItems, setSearchItems] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const { searchValues, setSearchValues, setMaxPrice, duration, setDuration } =
    useContext(userContext);

  const getUniqueRegionsWithCountries = (searchItems) => {
    const result = [];

    searchItems.forEach((item) => {
      let region = result.find((r) => r.region === item.region);

      if (!region) {
        region = { region: item.region, countries: [] };
        result.push(region);
      }

      if (!region.countries.includes(item.country)) {
        region.countries.push(item.country);
      }
    });
    return result;
  };

  // customize search item ------------
  const updateSearchItem = getUniqueRegionsWithCountries(searchItems);
  // get search item
  useEffect(() => {
    setSearchLoader(true);
    console.log(searchValues);
    if (searchValues?.tabValue) {
      fetch(
        `${baseUrl}/${
          searchValues?.tabValue === "Resorts" ||
          searchValues?.property === "resort"
            ? "resorts"
            : "boats"
        }/search-item`
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchItems(data?.data);
          setSearchLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setSearchLoader(false);
        });
    }
  }, [searchValues]);

  const handleDestination = (destination) => {
    // setSearchValues({
    //   ...searchValues,
    //   destination,
    // });

    setMaxPrice(null);
    setDuration(0);
    const updatedSearchValues = {
      ...searchValues,
      destination,
    };
    delete updatedSearchValues.minPrice;
    delete updatedSearchValues.maxPrice;
    delete updatedSearchValues.duration;
    setSearchValues(updatedSearchValues);

    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {searchLoader ? (
            <div className=" flex justify-center items-center">
              <div className="flex flex-col min-h-96 justify-center items-center">
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                {updateSearchItem?.map((item, i) => (
                  <div key={i}>
                    <h4 className="font-semibold text-[20px] mb-2">
                      {item?.region}
                    </h4>
                    {item?.countries?.map((country, i) => (
                      <p
                        onClick={() => handleDestination(country)}
                        className="my-2 cursor-pointer hover:text-blue-500"
                        key={i}
                      >
                        {country}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
