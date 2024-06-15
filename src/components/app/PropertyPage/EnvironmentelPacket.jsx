import Environmental from "./Environmental";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Typography from "@mui/material/Typography";

function EnvironmentelPacket({ propertyData }) {
  return (
    <>
      <div className="h-auto  md:h-auto customContainer py-2">
        <Environmental
          items={[
            {
              title:
                "   Which conservation organisations does the operation support? If any.",
              content: propertyData?.environmentalQuestions?.q1,
            },
            {
              title:
                "  Which efforts are taken to minimise overall environmental impact?",
              content: propertyData?.environmentalQuestions?.q2,
            },
            {
              title: " Which responsible diving practices are followed?",
              content: propertyData?.environmentalQuestions?.q3,
            },
            {
              title: " Which sustainable practices are adhered to?",
              content: propertyData?.environmentalQuestions?.q4,
            },
            {
              title:
                "  Which environmental impact assessments are taken? If any.",
              content: propertyData?.environmentalQuestions?.q5,
            },
            {
              title:
                "  Which community initiatives is the operator involved in? If any.",
              content: propertyData?.environmentalQuestions?.q5,
            },
            {
              title:
                "Which sustainable tourism initiatives is the operator involved in?",
              content: propertyData?.environmentalQuestions?.q6,
            },
            {
              title: "Does the operator have any self-authored initiatives? ",
              content: propertyData?.environmentalQuestions?.q7,
            },
            {
              title: "Plant Base / Vegan Meal Questions: ",
              content: propertyData?.environmentalQuestions?.q8,
            },
            {
              title:
                "Do you provide plant-based meals for vegans or those on adapted diets?",
              content: propertyData?.environmentalQuestions?.q9,
            },
            {
              title: "   Do you have a separate plant-based menu prepared? ",
              content: propertyData?.environmentalQuestions?.q10,
            },
            {
              title:
                "  Can you give five examples of your kitchen's best plant-based dishes?  ",
              content: propertyData?.environmentalQuestions?.q11,
            },
            {
              title: " Do you provide plant-based ‘milk’?  ",
              content: propertyData?.environmentalQuestions?.q12,
            },
            {
              title:
                "For a full board package, resort or liveaboard, how many days can you provide a changing, revolving plant-based menu? ",
              content: propertyData?.environmentalQuestions?.q13,
            },
            {
              title:
                " People talk about a ‘protein’ alternative; what do you usually provide as the ‘protein’ alternative for vegan meals? Do you procure meat alternatives?  ",
              content: propertyData?.environmentalQuestions?.q13,
            },
            {
              title:
                " Do you need any help or advice for your plant-based preparation or menu?  ",
              content: propertyData?.environmentalQuestions?.q14,
            },
          ]}
        />

        <div className="mt-5">
          <Accordion
            className="border-t border-[#00afff] w-full md:w-full font-outfit"
            sx={{ borderRadius: 0, backgroundColor: "#F1F2F2" }}
          >
            <AccordionSummary
              expandIcon={
                <AddCircleRoundedIcon className="md:text-[#3a95ea] text-[#3a95ea] md:text-5xl " />
              }
              aria-controls={`panel d-content`}
              id={`panel d-header`}
              className="bg-[#F1F2F2] flex-row-reverse md:flex-row-reverse"
              sx={{ borderRadius: 0 }}
            >
              <Typography className="font-outfit md:text-2xl md:font-extralight md:py-4 text-[#3a95ea]">
                Rsort Daily Schedule
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-[#2f2f30] md:text-lg bg-[#F1F2F2] font-outfit">
                {propertyData?.resortDailySchedule}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default EnvironmentelPacket;
