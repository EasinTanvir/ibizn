import React, { useState } from "react";
import UseBasicModal from "../../UI/Modal/UseBasicModal";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { RxCross2 } from "react-icons/rx";

// import { Button } from "flowbite-react";
import SendIcon from "@mui/icons-material/Send";
import { baseUrl } from "@/src/config/serverConfig";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transform: "translate(-50%, -50%)",
  width: { sm: 500, xs: 370 }, //
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  pt: 4,
  pb: 4,
  pl: 2,
  pr: 2,
};

const SignUpModal = ({ isModalOpen, setIsModalOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSignUpEmail = (e) => {
    setIsLoading(true);
    e.preventDefault();

    // Accessing form field values
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const body = { name, email, message };
    fetch(`${baseUrl}/send-email/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          setIsLoading(false);
          toast.success("Successfully send your message");
          setIsModalOpen(false);
        } else {
          setIsLoading(false);
          toast.error("Something went wrong. Please try later");
        }
      });
  };

  const handleClose = () => setIsModalOpen(false);
  return (
    <UseBasicModal isData={true} open={isModalOpen} setOpen={setIsModalOpen}>
      <div>
        <Box sx={style}>
          <div className="relative">
            {" "}
            <button
              onClick={handleClose}
              className="absolute lg:-right-24 -right-10 -top-5"
            >
              <RxCross2 className="text-2xl text-slate-800" />
            </button>
            <div>
              <div id="mc_embed_signup">
                <form
                  action="https://protonmail.us5.list-manage.com/subscribe/post?u=686f58751922907170dac8720&id=acb83b6e82&f_id=00af28ebf0"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate"
                  target="_blank"
                >
                  <div id="mc_embed_signup_scroll">
                    <h2 className="font-roboto text-2xl">
                      Subscribe to Deeparture
                    </h2>
                    <div className="indicates-required">
                      <span className="asterisk">*</span> indicates required
                    </div>
                    <div className="mc-field-group my-2 flex flex-col gap-1">
                      <label htmlFor="mce-EMAIL" className="font-semibold">
                        Email Address <span className="asterisk" />
                      </label>
                      <input
                        type="email"
                        name="EMAIL"
                        className="required email"
                        id="mce-EMAIL"
                        required
                        defaultValue
                      />
                      <span id="mce-EMAIL-HELPERTEXT" className="helper_text">
                        Enter your preferred email
                      </span>
                    </div>
                    <div className="mc-field-group my-2 flex flex-col gap-1">
                      <label htmlFor="mce-FNAME" className="font-semibold">
                        First Name <span className="asterisk" />
                      </label>
                      <input
                        type="text"
                        name="FNAME"
                        className="required text"
                        id="mce-FNAME"
                        required
                        defaultValue
                      />
                      <span id="mce-FNAME-HELPERTEXT" className="helper_text">
                        Enter your preferred name
                      </span>
                    </div>
                    <div className="mc-field-group my-2 flex flex-col gap-1">
                      <label className="font-semibold" htmlFor="mce-LNAME">
                        Last Name{" "}
                      </label>
                      <input
                        type="text"
                        name="LNAME"
                        className=" text"
                        id="mce-LNAME"
                        defaultValue
                      />
                    </div>
                    <p />
                    <div hidden>
                      <input type="hidden" name="tags" defaultValue={4284479} />
                    </div>
                    <div id="mce-responses" className="clear">
                      <div
                        className="response"
                        id="mce-error-response"
                        style={{ display: "none" }}
                      />
                      <div
                        className="response"
                        id="mce-success-response"
                        style={{ display: "none" }}
                      />
                    </div>
                    <div
                      style={{ position: "absolute", left: "-5000px" }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="b_686f58751922907170dac8720_acb83b6e82"
                        tabIndex={-1}
                        defaultValue
                      />
                    </div>
                    <div className="clear">
                      <input
                        type="submit"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        className="button bg-primary text-white"
                        defaultValue="Subscribe"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </UseBasicModal>
  );
};

export default SignUpModal;
