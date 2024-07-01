import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Typography from "@mui/material/Typography";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Environmental = ({ items }) => {
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : "");
  };

  return (
    <div>
      <h1 className="text-3xl mb-6 text-[#0080ff] font-light md:text-6xl md:font-light md:py-4 font-outfit">
        Environmental
      </h1>
      {items.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          className="border-t border-[#00afff] w-full md:w-full font-outfit  "
          sx={{ borderRadius: 0, backgroundColor: "#F1F2F2" }}
        >
          <AccordionSummary
            expandIcon={
              expanded === `panel${index}` ? (
                <>
                  <RemoveCircleOutlineIcon
                    sx={{
                      stroke: "#ffffff",
                      strokeWidth: 0.5,
                    }}
                    className="md:text-[#3a95ea] text-[#3a95ea] text-5xl    "
                  />
                </>
              ) : (
                <AddCircleOutlineIcon
                  sx={{
                    stroke: "#ffffff",
                  }}
                  className="md:text-[#3a95ea] text-[#3a95ea] text-5xl   -ml-6 sm:-ml-0"
                />
              )
            }
            aria-controls={`panel${index}d-content`}
            id={`panel${index}d-header`}
            className="bg-[#F1F2F2] flex-row-reverse md:flex-row-reverse"
            sx={{ borderRadius: 0 }}
          >
            <Typography className="font-outfit md:text-2xl md:font-extralight  text-primary ms-2 ">
              {item.title}
            </Typography>
          </AccordionSummary>
          <>
            <Typography className="text-secondary pb-3    md:text-lg bg-[#F1F2F2] font-light leading-0 sm:ps-16 ps-10 ms-2  sm:-mt-2 -mt-1">
              {item.content}
            </Typography>
          </>
        </Accordion>
      ))}
    </div>
  );
};

export default Environmental;
