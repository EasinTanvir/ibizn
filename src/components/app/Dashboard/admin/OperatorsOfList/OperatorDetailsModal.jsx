import React, { useState, useEffect } from "react";
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
  width: { xs: 350, sm: 550 }, // 'xs' for small devices, 'sm' and larger for medium/large devices
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 1,
};

const OperatorDetailsModal = ({ open, setOpen, operators, userId }) => {
  const [user, setUser] = useState();
  const [bankInformation, setBankInformation] = useState(null);

  console.log(bankInformation);
  const showBankInfo = () => {
    console.log("show bank info");
    fetch(`${baseUrl}/bank-information/${userId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setBankInformation(data?.data));
  };

  useEffect(() => {
    if (userId) {
      const myUser = operators.find((data) => data._id === userId);
      console.log(myUser);
      setUser(myUser);
      showBankInfo();
    }
  }, [userId]);

  const handleClose = () => {
    setOpen(false);
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
          <div className="h-[450px] px-4 py-2 overflow-y-auto">
            <button onClick={handleClose} className="absolute right-2 top-2">
              <RxCross2 className="text-2xl text-slate-800" />
            </button>
            <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
              User Details
            </Typography>
            <>
              <div className="my-8">
                <h2 className="text-2xl font-semibold ">Operator Details</h2>
                <div>
                  <p className="text-lg my-2">
                    <span className="font-semibold">Name:</span>{" "}
                    {user?.fullName}
                  </p>
                  <p className="text-lg my-2">
                    <span className="font-semibold">Email:</span> {user?.email}
                  </p>
                  <p className="text-lg my-2">
                    <span className="font-semibold">Phone:</span> {user?.phone}
                  </p>
                  <p className="text-lg my-2">
                    <span className="font-semibold">Status:</span>{" "}
                    {user?.status}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-2 mt-4">
                    Bank Information
                  </h2>

                  <div>
                    <h2 className="text-lg font-medium">Local Bank Info</h2>
                    <p className="text-lg my-2">
                      <span className="font-semibold">Bank Name:</span>{" "}
                      {bankInformation?.localBank?.bankName}
                    </p>
                    <p className="text-lg my-2">
                      <span className="font-semibold">
                        Account Holder Name:
                      </span>{" "}
                      {bankInformation?.localBank?.accountHolderName}
                    </p>
                    <p className="text-lg my-2">
                      <span className="font-semibold">Account Number:</span>{" "}
                      {bankInformation?.localBank?.accountNumber}
                    </p>
                    <p className="text-lg my-2">
                      <span className="font-semibold">Routing Number:</span>{" "}
                      {bankInformation?.localBank?.routingNumber}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Wise Bank Info</h2>
                    <p className="text-lg my-2">
                      <span className="font-semibold">Email:</span>{" "}
                      {bankInformation?.wiseBank?.email}
                    </p>
                  </div>
                </div>
              </div>
            </>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default OperatorDetailsModal;
