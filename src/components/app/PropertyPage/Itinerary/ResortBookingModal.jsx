import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { baseUrl } from "@/src/config/serverConfig";
import toast from "react-hot-toast";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import dayjs from "dayjs";
import { ColorRing } from "react-loader-spinner";
import { RxCross2 } from "react-icons/rx";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", sm: 450 }, // 'xs' for small devices, 'sm' and larger for medium/large devices
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 1,
};

const ResortBookingModal = ({ open, setOpen, propertyData, packages }) => {
  const startDate = dayjs();
  const endDate = dayjs().add(1, "day");

  const [updatedDate, setUpdatedDate] = React.useState({
    startDate,
    endDate,
  });

  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // handle booking boat
  const handleBookingBoat = (e) => {
    setLoading(true);
    const start = updatedDate.startDate.format();
    const end = updatedDate.endDate.format();
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const text = form.text.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const whatsapp = form.whatsapp.value;
    const numberOfGuest = form.numberOfGuest.value;
    const bookingData = {
      property: propertyData?._id,
      operator: propertyData?.user?._id,
      packageId: packages?._id,
      price: Number(packages?.ConvertedPrice),
      name,
      text,
      phone,
      email,
      whatsapp,
      numberOfGuest,
      startDate: start,
      endDate: end,
    };
    console.log(bookingData);

    fetch(`${baseUrl}/resort-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success("Booking successful");
          setOpen(false);
          setLoading(false);
        } else {
          toast.error("Booking Failed");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            className="h-[450px] px-4 py-2 overflow-y-auto"
            onSubmit={handleBookingBoat}
          >
            <button onClick={handleClose} className="absolute right-2 top-2">
              <RxCross2 className="text-2xl text-slate-800" />
            </button>
            <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
              Booking Package
            </Typography>
            <div className="mt-2">
              <p className="text-lg font-semibold">Name:</p>
              <input
                type="text"
                name="name"
                className="w-full rounded-md"
                required
              />
            </div>
            <div className="mt-2">
              <p className="text-lg font-semibold">Phone:</p>
              <input
                type="text"
                name="phone"
                className="w-full rounded-md"
                required
              />
            </div>
            <div className="mt-2">
              <p className="text-lg font-semibold">Email:</p>
              <input
                type="email"
                name="email"
                className="w-full rounded-md"
                required
              />
            </div>
            <div className="mt-2">
              <p className="text-lg font-semibold">whatsapp:</p>
              <input
                type="text"
                name="whatsapp"
                className="w-full rounded-md"
                required
              />
            </div>
            <div className="mt-2">
              <p className="text-lg font-semibold">Number Of Guest:</p>
              <input
                type="text"
                name="numberOfGuest"
                className="w-full rounded-md"
                required
              />
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">Planned travel dates</p>
            </div>
            <React.Fragment>
              <div className="md:flex gap-6 my-1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <p className="text-lg font-semibold">Start date:</p>
                    <DatePicker
                      value={updatedDate.startDate}
                      onChange={(newDate) =>
                        setUpdatedDate({
                          ...updatedDate,
                          startDate: newDate,
                        })
                      }
                      renderInput={(params) => <input {...params} />}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">End date:</p>
                    <DatePicker
                      value={updatedDate.endDate}
                      onChange={(newDate) =>
                        setUpdatedDate({
                          ...updatedDate,
                          endDate: newDate,
                        })
                      }
                      renderInput={(params) => <input {...params} />}
                    />
                  </div>
                </LocalizationProvider>
              </div>
            </React.Fragment>
            <div className="mt-2">
              <p className="text-lg font-semibold">Message : </p>
              <textarea
                type="text"
                name="text"
                className="w-full rounded-md"
                required
                rows={3}
              />
            </div>
            <div>
              <button
                disabled={loading}
                type="submit"
                className="main-button py-3 w-full mt-4 flex justify-center items-center"
              >
                {loading ? (
                  <ColorRing
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ResortBookingModal;
