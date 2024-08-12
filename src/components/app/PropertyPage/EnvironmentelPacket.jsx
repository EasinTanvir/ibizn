import Environmental from "./Environmental";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function EnvironmentelPacket({ propertyData, resort }) {
  return (
    <>
      <div className="h-auto  md:h-auto customContainer pb-2">
        <Environmental
          items={[
            {
              title: "Which conservation organisations do you support?",
              content: propertyData?.environmentalQuestions?.q1,
            },
            {
              title:
                "Which efforts do you take to minimise negative environmental impact?",
              content: propertyData?.environmentalQuestions?.q2,
            },
            {
              title: "Which responsible diving practices are followed?",
              content: propertyData?.environmentalQuestions?.q3,
            },
            {
              title: "Which sustainable practices do you follow?",
              content: propertyData?.environmentalQuestions?.q4,
            },
            {
              title: "Do you make any environmental impact assessments?",
              content: propertyData?.environmentalQuestions?.q5,
            },
            {
              title: "Which community initiatives are you involved in?",
              content: propertyData?.environmentalQuestions?.q6,
            },
            {
              title:
                "Which sustainable tourism initiatives are you involved in?",
              content: propertyData?.environmentalQuestions?.q7,
            },
            {
              title:
                "Do you have any self-authored or self-created environmental projects?",
              content: propertyData?.environmentalQuestions?.q8,
            },
            {
              title:
                "Do you provide plant-based meals for vegans or those on adapted diets?",
              content: propertyData?.environmentalQuestions?.q9,
              extra: true,
            },
            {
              title: "Do you have a separate, plant-based menu?",
              content: propertyData?.environmentalQuestions?.q10,
              extra: true,
            },
            {
              title:
                "Can you give examples of your kitchen’s finest, plant-based dishes?",
              content: propertyData?.environmentalQuestions?.q11,
              extra: true,
            },
            {
              title: "Do you provide plant-based milk?",
              content: propertyData?.environmentalQuestions?.q12,
              extra: true,
            },
            {
              title:
                "For full board packages, how many days can you provide a changing or revolving, plant-based menu for?",
              content: propertyData?.environmentalQuestions?.q13,
              extra: true,
            },
            {
              title:
                " Which ‘protein’ alternatives can you, or do you usually provide?",
              content: propertyData?.environmentalQuestions?.q14,
              extra: true,
            },
          ]}
        />

        {/* {resort && (
          <div className="">
            <Accordion
              className="border-t border-[#00afff] w-full md:w-full font-outfit"
              sx={{ borderRadius: 0, backgroundColor: "#F1F2F2" }}
            >
              <AccordionSummary
                expandIcon={
                  <AddCircleOutlineIcon
                    sx={{
                      stroke: "#ffffff",
                      strokeWidth: 0.5,
                    }}
                    className="text-primary md:text-5xl   "
                  />
                }
                aria-controls={`panel d-content`}
                id={`panel d-header`}
                className="bg-[#F1F2F2] flex-row-reverse md:flex-row-reverse"
                sx={{ borderRadius: 0 }}
              >
                <Typography className="font-outfit ps-2 md:text-2xl md:font-extralight  text-[#3a95ea]">
                  Resort Daily Schedule
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="text-secondary md:text-lg bg-[#F1F2F2] font-outfit sm:ps-14 ps-10 sm:-mt-2 -mt-1">
                  {propertyData?.resortDailySchedule}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        )} */}
      </div>
    </>
  );
}

export default EnvironmentelPacket;
