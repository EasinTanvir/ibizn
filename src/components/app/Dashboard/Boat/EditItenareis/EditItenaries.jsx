import { React, useState, useEffect, useContext } from "react";
import Spinner from "@/src/components/core/shared/Loader/Spinner";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { baseUrl } from "@/src/config/serverConfig";
import { userContext } from "@/src/storage/contextApi";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { compressAndConvertToBase64 } from "@/src/config/base64"; // Assuming you have this utility

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  overflow: "scroll",
  "&::-webkit-scrollbar": {
    width: "12px", // Set the width of the scrollbar
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888", // Set the color of the scrollbar thumb
    borderRadius: "10px", // Set the border radius of the scrollbar thumb
    border: "3px solid #f1f1f1", // Add a border around the scrollbar thumb
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555", // Set the color of the scrollbar thumb on hover
  },
};

const EditItenaries = ({
  itinerariesData,
  handleClose,
  open,
  setItineraryControl,
}) => {
  const [loader, setLoader] = useState(true);
  const [itineraries, setItineraries] = useState({});
  const { country } = useContext(userContext);
  const [selectCurrency, setSelectCurrency] = useState({});
  const [cabins, setCabins] = useState([
    { cabinName: "", cabinPrice: "", cabinPicture: "", currency: "" },
  ]);

  const [regiion, setRegion] = useState(itineraries?.region || "");
  const [countryList, setCountryList] = useState([]);

  const handleCurrencyChange = (index, event) => {
    let myEvents = event.target.value !== "select" ? event.target.value : "USD";
    setSelectCurrency({ ...selectCurrency, [index]: myEvents });

    const updatedCabins = [...cabins];
    updatedCabins[index][event.target.name] = myEvents;
    setCabins(updatedCabins);
  };

  const handleItinerariesSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setItineraryControl(false);
    const { region, ...feildData } = itineraries;
    fetch(`${baseUrl}/itineraries/${itinerariesData.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify({
        ...feildData,
        region: regiion,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Awesome, Your Itinerary Has Been Successfully updated.",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          setItineraryControl(true);
          handleClose();
        } else {
          console.log(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const countryItem = country.filter((item) => item.region === regiion);
    setCountryList(countryItem);
  }, [regiion]);

  useEffect(() => {
    fetch(`${baseUrl}/itineraries/${itinerariesData.id}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setItineraries(data?.data);
        setRegion(data?.data?.region);
        setCabins(data?.data?.cabins);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setItineraries({ ...itineraries, cabins: cabins });
  }, [cabins]);

  if (loader) return <Spinner />;

  const addMoreCabin = () => {
    setCabins([...cabins, { cabinName: "", cabinPrice: "", cabinPicture: "" }]);
  };

  const removeCabin = (index) => {
    const updatedCabins = [...cabins];
    updatedCabins.splice(index, 1);
    setCabins(updatedCabins);
  };

  const handleCabinChange = (index, e) => {
    const updatedCabins = [...cabins];
    updatedCabins[index][e.target.name] = e.target.value;
    setCabins(updatedCabins);
  };

  const handleCabinPictureChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      compressAndConvertToBase64(file, 800, 600, 0.7) // Adjust compression settings as needed
        .then((base64String) => {
          const updatedCabins = [...cabins];
          updatedCabins[index].cabinPicture = base64String;
          setCabins(updatedCabins);
        })
        .catch((error) => {
          console.error("Error converting image to base64:", error);
          Swal.fire(
            "Error",
            "Error converting image. Please try again.",
            "error"
          );
        });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {loader ? (
          <Spinner />
        ) : (
          <div>
            <h3 className="text-center font-semibold text-3xl">
              Update Itinerary For Boat
            </h3>
            <div className="mt-10">
              <form onSubmit={handleItinerariesSubmit}>
                <div className="lg:flex gap-3 items-center">
                  <div className="mt-4 w-full">
                    <p className="text-lg font-semibold">Itinerary Name</p>
                    <input
                      onChange={(e) =>
                        setItineraries({
                          ...itineraries,
                          itineraryName: e.target.value,
                        })
                      }
                      defaultValue={itineraries?.itineraryName}
                      type="text"
                      name="itineraryName"
                      required
                      placeholder="Itinerary Name"
                      className="w-full rounded-md"
                    />
                  </div>
                </div>
                {/* Region and Country */}
                <div className="grid grid-cols-3 gap-x-2 mt-8">
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="region">Region</InputLabel>
                      <Select
                        labelId="region"
                        defaultValue={regiion}
                        id="region"
                        name="region"
                        label="region"
                        onChange={(e) => setRegion(e.target.value)}
                      >
                        {country?.map((item, index) => (
                          <MenuItem key={index} value={item?.region}>
                            {item?.region}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl disabled={countryList?.length === 0} fullWidth>
                      <InputLabel id="country">Country</InputLabel>
                      <Select
                        labelId="country"
                        defaultValue={itineraries?.country}
                        id="country"
                        name="country"
                        label="country"
                        onChange={(e) =>
                          setItineraries({
                            ...itineraries,
                            country: e.target.value,
                          })
                        }
                      >
                        {countryList[0]?.countries?.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        id="district"
                        InputProps={{
                          style: {
                            padding: "8px ",
                          },
                        }}
                        defaultValue={itineraries?.district}
                        name="district"
                        label="District"
                        variant="outlined"
                        onChange={(e) =>
                          setItineraries({
                            ...itineraries,
                            district: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </div>
                </div>
                {/* Other Itinerary Fields */}
                <div className="lg:flex gap-3 items-center">
                  <div className="mt-4 w-full">
                    <p className="text-lg font-semibold">Embarkation Point</p>
                    <input
                      onChange={(e) =>
                        setItineraries({
                          ...itineraries,
                          embarkationPoints: e.target.value,
                        })
                      }
                      defaultValue={itineraries?.embarkationPoints}
                      type="text"
                      name="embarkationPoints"
                      required
                      placeholder="Embarkation Point"
                      className="w-full rounded-md"
                    />
                  </div>
                  <div className="mt-3 w-full">
                    <p className="text-lg font-semibold">
                      Disembarkation Point
                    </p>
                    <input
                      onChange={(e) =>
                        setItineraries({
                          ...itineraries,
                          disembarkationPoints: e.target.value,
                        })
                      }
                      type="text"
                      required
                      defaultValue={itineraries?.disembarkationPoints}
                      name="disembarkationPoints"
                      placeholder="Disembarkation Point"
                      className="w-full rounded-md"
                    />
                  </div>
                </div>
                <div className="lg:flex gap-3 items-center">
                  <div className="mt-4 w-full">
                    <p className="text-lg font-semibold">Number of Days</p>
                    <input
                      onChange={(e) =>
                        setItineraries({
                          ...itineraries,
                          numberOfDays: Number(e.target.value),
                        })
                      }
                      type="number"
                      name="numberOfDays"
                      defaultValue={itineraries?.numberOfDays}
                      required
                      placeholder="Number of Days"
                      className="w-full rounded-md"
                    />
                  </div>
                  <div className="mt-3 w-full">
                    <p className="text-lg font-semibold">Number of Nights</p>
                    <input
                      onChange={(e) =>
                        setItineraries({
                          ...itineraries,
                          numberOfNights: Number(e.target.value),
                        })
                      }
                      type="number"
                      defaultValue={itineraries?.numberOfNights}
                      required
                      name="numberOfNights"
                      placeholder="Number of Nights"
                      className="w-full rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mt-2 mb-1 border-b-2">
                    Add Cabins
                  </h3>
                  {cabins.map((cabin, index) => (
                    <div className="lg:flex gap-3 items-center " key={index}>
                      <div className="mt-3 w-full">
                        <p className="text-lg font-semibold">Cabin Name</p>
                        <input
                          type="text"
                          value={cabin.cabinName}
                          onChange={(e) => handleCabinChange(index, e)}
                          name="cabinName"
                          placeholder="Cabin Name"
                          className="w-full rounded-md"
                        />
                      </div>
                      <div className="mt-3 w-full">
                        <p className="text-lg font-semibold">
                          Price per person
                        </p>
                        <input
                          type="number"
                          value={cabin.cabinPrice}
                          onChange={(e) => handleCabinChange(index, e)}
                          name="cabinPrice"
                          placeholder="Price per person"
                          className="w-full rounded-md"
                        />
                      </div>
                      <div className="mt-10 w-full flex items-center">
                        <select
                          required
                          className=" border border-slate-600 rounded-md w-full font-semibold"
                          onChange={(e) => handleCurrencyChange(index, e)}
                          value={cabin.currency}
                          name="currency"
                          id="currency"
                        >
                          <option value="select">Select Currency</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="IDR">IDR</option>
                          <option value="GBP">GBP</option>
                          <option value="CAD">CAD</option>
                          <option value="AUD">AUD</option>
                          <option value="NZD">NZD</option>
                          <option value="THB">THB</option>
                          <option value="CHF">CHF</option>
                          <option value="PHP">PHP</option>
                          <option value="MYR">MYR</option>
                        </select>
                      </div>
                      <div className="mt-3 w-full">
                        <p className="text-lg font-semibold">Cabin Picture</p>
                        <input
                          type="file"
                          onChange={(e) => handleCabinPictureChange(index, e)}
                          accept="image/*"
                          name="cabinPicture"
                          placeholder="Cabin Picture"
                          className="w-full"
                        />
                      </div>
                      {cabin?.cabinPrice && (
                        <img
                          className="h-10 w-10 mt-6"
                          src={cabin?.cabinPicture}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeCabin(index)}
                        className="text-white mt-10 cursor-pointer py-2 rounded"
                      >
                        <CloseIcon sx={{ color: "black" }} />
                      </button>
                    </div>
                  ))}
                  <div
                    onClick={addMoreCabin}
                    className="text-white bg-green-500 cursor-pointer mt-2 flex justify-center py-2 rounded w-24"
                  >
                    Add More
                  </div>
                </div>
                <div className="mt-3 w-full">
                  <p className="text-lg font-semibold">Up to how many dives</p>
                  <input
                    onChange={(e) =>
                      setItineraries({
                        ...itineraries,
                        numberOfDives: Number(e.target.value),
                      })
                    }
                    type="number"
                    required
                    defaultValue={parseInt(itineraries?.numberOfDives)}
                    name="numberOfDives"
                    placeholder="Up to how many dives"
                    className="w-full rounded-md"
                    min={0}
                  />
                </div>
                <div className="mt-3 w-full">
                  <p className="text-lg font-semibold">Itinerary Description</p>

                  <ReactQuill
                    required
                    value={itineraries?.itineraryDescription}
                    name="itineraryDescription"
                    placeholder="Itinerary Description"
                    className="w-full h-20 rounded-md border"
                    modules={{
                      toolbar: false,
                    }}
                    onChange={(value) =>
                      setItineraries({
                        ...itineraries,
                        itineraryDescription: value,
                      })
                    }
                    theme="snow" // This is the default theme; you can customize it as needed
                  />

                  {/* <textarea
                    onChange={(e) =>
                      setItineraries({
                        ...itineraries,
                        itineraryDescription: e.target.value,
                      })
                    }
                    type="text"
                    required
                    defaultValue={itineraries?.itineraryDescription}
                    name="itineraryDescription"
                    placeholder="Itinerary Description"
                    className="w-full h-20 rounded-md"
                  /> */}
                </div>
                <input
                  className="w-full rounded-md cursor-pointer custom_red_color py-3 my-4 text-white font-semibold"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default EditItenaries;
