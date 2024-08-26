import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Typography from "@mui/material/Typography";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Environmental = ({ items }) => {
  const filterItems = items.filter((data) => data.content !== "N/A");

  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : "");
  };

  const [lastIndex, setLastIndex] = useState(null);

  useEffect(() => {
    // Find the last index where extra is undefined or false
    const lastFalseIndex = filterItems
      .map((item, index) => ({
        index,
        extra: item.extra,
      }))
      .reverse()
      .find((item) => !item.extra)?.index;

    setLastIndex(lastFalseIndex);
  }, [filterItems]);

  return (
    <div>
      <h1 className="sm:text-title text-title2  text-primary   font-light  sm:mb-[60px] mb-[45px] font-outfit">
        Environmental
      </h1>
      <div className="border-b-[1px]    border-[#0080ff]">
        {filterItems.map((item, index) => {
          if (!item.extra)
            return (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                className={`border-t-[1px]    border-[#0080ff] w-full md:w-full font-outfit`}
                sx={{
                  borderRadius: 0,
                  backgroundColor: "#F1F2F2",
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    expanded === `panel${index}` ? (
                      <>
                        <img
                          className="min-w-9 max-w-9"
                          src="/plus (3).svg"
                          alt=""
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="min-w-9 max-w-9"
                          src="/plus (1).svg"
                          alt=""
                        />
                      </>
                    )
                  }
                  aria-controls={`panel${index}d-content`}
                  id={`panel${index}d-header`}
                  className="bg-[#F1F2F2] flex-row-reverse md:flex-row-reverse"
                  sx={{ borderRadius: 0 }}
                >
                  <Typography className="font-outfit sm:text-[24px] text-[18px] sm:leading-[24px] leading-[18px] font-light  text-primary ms-2 py-1  ">
                    {item.title}
                  </Typography>
                </AccordionSummary>
                <>
                  <Typography className="text-secondary pb-3    sm:text-subtitle text-[16px] leading-[18px] font-roboto bg-[#F1F2F2] font-light  sm:ps-16 ps-10 ms-2  sm:mt-[30px] ">
                    {item.content}
                  </Typography>
                </>
              </Accordion>
            );
        })}
      </div>
      <div className="mt-6">
        <h1 className="sm:text-title text-title2 sm:mb-[60px] mb-[45px] text-[#0080ff] font-light md:pt-5 font-outfit">
          Plant-based | Vegan Meal Questions
        </h1>
        {filterItems.map((item, index) => {
          if (item.extra)
            return (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                className={`border-t ${
                  index === filterItems.length - 1 ? "border-b-[1px]" : ""
                }  border-[#0080ff] w-full md:w-full font-outfit  `}
                sx={{
                  borderRadius: 0,
                  backgroundColor: "#F1F2F2",
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    expanded === `panel${index}` ? (
                      <>
                        <img
                          className="min-w-9 max-w-9"
                          src="/plus (3).svg"
                          alt=""
                        />
                      </>
                    ) : (
                      <img
                        className="min-w-9 max-w-9"
                        src="/plus (1).svg"
                        alt=""
                      />
                    )
                  }
                  aria-controls={`panel${index}d-content`}
                  id={`panel${index}d-header`}
                  className="bg-[#F1F2F2] flex-row-reverse md:flex-row-reverse"
                  sx={{ borderRadius: 0 }}
                >
                  <Typography className="font-outfit  sm:text-subtitle text-[16px] leading-[18px] font-light  text-primary ms-2 py-1">
                    {item.title}
                  </Typography>
                </AccordionSummary>
                <>
                  <Typography className="text-secondary pb-3    sm:text-subtitle font-roboto bg-[#F1F2F2] font-light  sm:ps-16 ps-10 ms-2  sm:mt-[30px]">
                    {item.content}
                  </Typography>
                </>
              </Accordion>
            );
        })}
      </div>
    </div>
  );
};

export default Environmental;
