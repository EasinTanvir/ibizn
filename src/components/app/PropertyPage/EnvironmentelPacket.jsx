import Environmental from "./Environmental";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function EnvironmentelPacket({ propertyData, resort }) {
  return (
    <>
      <div className=" sm:pt-[90px] pt-[75px] sm:pb-[120px] pb-[90px]   customContainer ">
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
      </div>
    </>
  );
}

export default EnvironmentelPacket;
