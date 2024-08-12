import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { baseUrl } from "@/src/config/serverConfig";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import dayjs from "dayjs";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteOutline, EditNoteOutlined } from "@mui/icons-material";
const initialState = {
  tripStart: null,
  tripEnd: null,
  itinerary: "",
  currency: "USD",
  cost: 0,
  discount: {
    name: "",
    percent: 0,
  },
  special: false,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BoardTable = ({
  setItineraryData,
  itineraryData,
  totalSteps,
  currentStep,
  setCurrentStep,
  increaseProgress,
  decreaseProgress,
  boardData,
  submitData,
}) => {
  console.log({ boardData });
  const [currency, setCurrency] = useState(null);
  const [row, setRow] = useState(0);
  const [open, setOpen] = useState(false);
  const [itinerary, setItinerary] = useState([]);
  const [discountName, setDiscountName] = useState();
  const [discountAmount, setDiscountAmount] = useState();
  console.log(itinerary);
  const [formData, setFormData] = useState(initialState);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const incrementRow = () => {
    setDiscountAmount(undefined);
    setDiscountAmount(undefined);
    setRow(row + 1);
    handleOpen();
  };

  useEffect(() => {
    fetch(`${baseUrl}/itineraries/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setItinerary(data?.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCurrencyChange = (event) => {
    let myEvents = event !== "select" ? event : "USD";
    console.log(myEvents);
    setCurrency(myEvents);

    setFormData({
      ...formData,
      currency: myEvents,
    });
  };

  const handleChange = (event) => {
    setItinerary(event.target.value);
  };

  console.log({ itinerary });
  const handleDateChange = (newValue) => {
    setFormData({
      ...formData,
      tripStart: newValue[0],
      tripEnd: newValue[1],
    });
  };

  const handleItineraryChange = (event) => {
    setFormData({
      ...formData,
      itinerary: event.target.value,
    });
  };

  const handleCostChange = (event) => {
    setFormData({
      ...formData,
      cost: event.target.value,
    });
  };
  console.log(discountAmount);

  const handleSpecialChange = (event) => {
    setFormData({
      ...formData,
      special: event.target.checked,
    });
  };
  console.log(discountName);
  console.log(discountAmount);
  console.log(formData);
  console.log(itineraryData);

  useEffect(() => {
    if (discountName) {
      setFormData({
        ...formData,
        discount: {
          ...formData.discount,
          name: discountName,
        },
      });
    }
    if (discountAmount) {
      setFormData({
        ...formData,
        discount: {
          ...formData.discount,

          percent: discountAmount,
        },
      });
    }
  }, [discountName, discountAmount]);

  const handleDone = () => {
    setItineraryData((prevent) => [...prevent, formData]);
    setDiscountAmount(0);
    setDiscountName(undefined);
    setFormData(initialState);
    handleClose();
  };
  console.log({ itineraryData });

  const removeRow = (index) => {
    const newItineraryData = itineraryData.filter((item, i) => i !== index);

    setItineraryData(newItineraryData);
  };

  // go to next step ------------
  const goToNextStep = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
    increaseProgress();
  };
  // go to previous step ------------
  const goToPrevStep = () => {
    setCurrentStep(currentStep - 1);
    decreaseProgress();
  };
  return (
    <div className="overflow-x-auto">
      <form onSubmit={submitData}>
        <Button onClick={incrementRow}>(+) Add New Trip Itinerary</Button>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-1 border-b">TRIP START </th>
              <th className="py-2 px-1 border-b">TRIP END DATE</th>
              <th className="py-2 px-1 border-b">ITINERARY</th>
              <th className="py-2 px-1 border-b">TRIP COST</th>
              <th className="py-2 px-1 border-b">Discount </th>
              <th className="py-2 px-1 border-b">Special </th>
              <th className="py-2 px-1 border-b">Action </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {itineraryData.map((items, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="py-2 text-center border-b">
                  {dayjs(items?.tripStart).format("MMMM D, YYYY")}
                </td>
                <td className="py-2 text-center border-b">
                  {dayjs(items?.tripEnd).format("MMMM D, YYYY")}
                </td>
                <td className="py-2 text-center border-b">
                  {
                    itinerary?.find((item) => item?._id === items?.itinerary)
                      ?.itineraryName
                  }
                </td>
                <td className="py-2 text-center border-b">{items?.cost}</td>
                <td className="py-2 text-center border-b">
                  {items?.discount?.name && items?.discount?.percent ? (
                    <>
                      {items?.discount?.name} - {items?.discount?.percent}%
                    </>
                  ) : (
                    <>-</>
                  )}
                </td>
                <td className="py-2 text-center border-b">
                  {items?.special ? (
                    <CheckIcon className="text-green-500" />
                  ) : (
                    <CloseIcon className="text-red-500" />
                  )}
                </td>
                <td className="py-2  border-b flex justify-center">
                  <div className="flex gap-3 items-center">
                    <button className="px-3 py-1 rounded bg-indigo-500 text-white flex gap-2 items-center">
                      <span>Edit</span> <EditNoteOutlined />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      className="px-3 py-1 rounded bg-red-500 text-white flex gap-2 items-center"
                    >
                      <span>Delete</span> <DeleteOutline />
                    </button>
                  </div>
                </td>

                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <h1 className="font-bold text-xl border-b mb-2 pb-2">
                Trip Start and End Dates
              </h1>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                  value={[formData.tripStart, formData.tripEnd]}
                  onChange={handleDateChange}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} />
                    </>
                  )}
                />
              </LocalizationProvider> */}
              <div className="flex gap-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <p className="mb-1">Start Date</p>
                    <DatePicker
                      value={formData.tripStart}
                      onChange={(newDate) =>
                        setFormData({
                          ...formData,
                          tripStart: newDate,
                        })
                      }
                    />
                  </div>
                  <div>
                    <p className="mb-1">End Date</p>
                    <DatePicker
                      value={formData.tripEnd}
                      onChange={(newDate) =>
                        setFormData({
                          ...formData,
                          tripEnd: newDate,
                        })
                      }
                    />
                  </div>
                </LocalizationProvider>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl border-b mb-2 mt-3 pb-2">
                Itinerary
              </h1>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">itinerary</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleItineraryChange}
                  label="itinerary"
                >
                  {itinerary?.map((items) => (
                    <MenuItem value={items?._id}>
                      {items?.itineraryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <h1 className="font-bold text-xl border-b mb-2 mt-3 pb-2">
                Trip Cost
              </h1>
              <div className="flex items-center gap-3">
                <TextField
                  id="outlined-basic"
                  label="Trip Cost"
                  type="number"
                  onChange={handleCostChange}
                  variant="outlined"
                />

                <select
                  required
                  className="font-semibold border border-slate-600"
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  value={currency}
                  name=""
                  id=""
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
            </div>
            <div className="pt-2 pb-1">
              <h1 className="font-bold mt-2 text-xl border-b mb-2">
                Discount for this Trip (if any)
              </h1>
              <div className="flex gap-2">
                <TextField
                  id="outlined-basic"
                  label="Discount name
"
                  variant="outlined"
                  onChange={(e) => setDiscountName(e.target.value)}
                />
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Percentage"
                  value={discountAmount}
                  variant="outlined"
                  onChange={(e) => setDiscountAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="py-1">
              <h1 className="font-bold mt-2 text-xl border-b mb-2">
                Special Offer
              </h1>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData?.special}
                    onChange={handleSpecialChange}
                  />
                }
                label="Slide to add this trip to Special Offers"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleClose}
                className="px-8 py-2 rounded-md text-white bg-red-500"
              >
                Cancel
              </button>
              <button
                className="px-8 py-2 rounded-md text-white bg-green-500"
                onClick={handleDone}
              >
                Done
              </button>
            </div>
          </Box>
        </Modal>
        <div className="flex justify-between mt-10">
          {currentStep > 1 && (
            <button
              onClick={goToPrevStep}
              className="custom_red_color  px-10 py-3 text-white rounded-md font-semibold"
            >
              Previous
            </button>
          )}
          {currentStep < totalSteps ? (
            <button
              type="submit"
              className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              // onClick={submitData}
              className="bg-green-500 px-10 py-3 text-white rounded-md font-semibold"
            >
              Finish
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BoardTable;
