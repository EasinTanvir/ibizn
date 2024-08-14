import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { sm: 480, xs: 350 }, //
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  pt: 4,
  pb: 4,
  pl: 2,
  pr: 2,
};

export default function UseBasicModal({
  open,
  setOpen,
  children,
  isData = false,
}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isData ? <>{children}</> : <Box sx={style}>{children}</Box>}
      </Modal>
    </div>
  );
}
