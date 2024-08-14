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
              title: "Conservation organisations we support.",
              content: propertyData?.environmentalQuestions?.q1,
            },
            {
              title: "Minimizing negative environmental impact.",
              content: propertyData?.environmentalQuestions?.q2,
            },
            {
              title: "We follow these responsible diving practices.",
              content: propertyData?.environmentalQuestions?.q3,
            },
            {
              title: "We follow these sustainable practices.",
              content: propertyData?.environmentalQuestions?.q4,
            },
            {
              title: "We make the following environmental impact assessments.",
              content: propertyData?.environmentalQuestions?.q5,
            },
            {
              title: "Community initiatives we support.",
              content: propertyData?.environmentalQuestions?.q6,
            },
            {
              title: "Sustainable tourism enterprises we are involved in.",
              content: propertyData?.environmentalQuestions?.q7,
            },
            {
              title: "Our environmental projects.",
              content: propertyData?.environmentalQuestions?.q8,
            },
            {
              title:
                "Do we provide plant-based meals for vegans and those on adapted diets?",
              content: propertyData?.environmentalQuestions?.q9,
              extra: true,
            },
            {
              title: "Do we have a separate, plant-based menu?",
              content: propertyData?.environmentalQuestions?.q10,
              extra: true,
            },
            {
              title: "Our kitchen’s finest, plant-based dishes.",
              content: propertyData?.environmentalQuestions?.q11,
              extra: true,
            },
            {
              title: "Do we provide plant-based milk?",
              content: propertyData?.environmentalQuestions?.q12,
              extra: true,
            },
            {
              title:
                "We can provide a changing | revolving adapted meal menu for this many days.",
              content: propertyData?.environmentalQuestions?.q13,
              extra: true,
            },
            {
              title: "We provide these ‘protein’ alternatives.",
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
