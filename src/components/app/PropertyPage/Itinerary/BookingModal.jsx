import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { baseUrl } from "@/src/config/serverConfig";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import { RxCross2 } from "react-icons/rx";
const style = {
  top: "50%",
  left: "50%",
  position: "relative",
  transform: "translate(-50%, -50%)",
  width: { sm: 480, xs: 350 }, // 'xs' for small devices, 'sm' and larger for medium/large devices
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  p: 3,
};

const BookingModal = ({
  open,
  setOpen,
  propertyData,
  schedule,
  cabinId,
  discountPrice,
  cabinPrice,
  discount,
}) => {
  console.log(propertyData);
  console.log(schedule);

  console.log(discount);
  console.log(cabinPrice);
  console.log(discountPrice);

  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // handle booking boat
  const handleBookingBoat = (e) => {
    setLoading(true);
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const whatsapp = form.whatsapp.value;
    const numberOfGuest = form.numberOfGuest.value;
    const text = form.text.value;
    const bookingData = {
      property: propertyData?._id,
      operator: propertyData?.user?._id,
      scheduleId: schedule?._id,
      cabinId: cabinId,
      startDate: schedule?.tripStart,
      endDate: schedule?.tripEnd,
      cabinPrice: cabinPrice,
      price: 220,
      name,
      phone,
      text,
      email,
      whatsapp,
      numberOfGuest,
    };
    fetch(`${baseUrl}/boat-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setLoading(false);
          toast.success("Booking successful");
          setOpen(false);
        } else {
          toast.error("Something went wrong");
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
            <Typography
              className="pt-4"
              sx={{ fontSize: "25px", fontWeight: 600 }}
            >
              Interested in this trip?
            </Typography>
            <div className="mt-2">
              <p className="text-lg font-semibold">Let us know your name</p>
              <input
                type="text"
                name="name"
                className="w-full rounded-md"
                required
              />
            </div>
            <div className="mt-2">
              <p className="text-lg font-semibold"> Phone number</p>
              <input type="text" name="phone" className="w-full rounded-md" />
            </div>
            <div className="mt-2">
              <p className="text-lg font-semibold">Email</p>
              <input
                type="email"
                name="email"
                className="w-full rounded-md"
                required
              />
            </div>
            <div className="mt-2">
              <p className="text-lg font-semibold">WhatsApp contact number</p>
              <input
                type="text"
                name="whatsapp"
                className="w-full rounded-md"
              />
            </div>
            <div className="mt-2">
              <p className="text-lg font-semibold">Number of guests</p>
              <input
                type="text"
                name="numberOfGuest"
                className="w-full rounded-md"
                required
              />
            </div>
            <div className="mt-2">
              <p className="text-lg font-semibold">
                Anything you would like to add?
              </p>
              <textarea
                type="text"
                name="text"
                className="w-full rounded-md"
                rows={3}
              />
            </div>
            <div>
              <button
                disabled={loading}
                type="submit"
                className="main-button py-3 w-full mt-1 flex justify-center items-center"
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

export default BookingModal;
