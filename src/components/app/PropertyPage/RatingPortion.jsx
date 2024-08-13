import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function RatingPortion({ rating }) {
  const [value, setValue] = React.useState(rating); // Remove the type annotation

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <div className="md:text-2xl text-[#0080FF]">
        <span className="font-semibold">Vegan rating</span>: {value}
      </div>
      <Rating
        name="read-only"
        value={value}
        readOnly
        className="text-primary text-2xl mt-1"
      />
    </Box>
  );
}
