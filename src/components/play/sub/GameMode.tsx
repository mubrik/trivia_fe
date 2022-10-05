import { useState, useEffect } from "react";
// router
import { RouterLinkButton, RespRouterLinkButton } from "../../utils/RouterButtonLink";
// animte
import { motion, AnimatePresence } from "framer-motion";
// material
import { 
  Button, Stack, Typography, Container 
} from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ReplayIcon from '@mui/icons-material/Replay';
// store
import { useStore } from "../../store/StoreContext";
// custom comps
import { 
  Accordion, AccordionDetails, AccordionSummary,
  AccordionMotionDiv
} from "../../utils/customStyledComps";
// types
import { IGameModesAccordionProps } from "../../compTypes";


export default function SelectGameMode () {
  // settings
  const { timedPlaySettings, freePlaySettings } = useStore();

  return(
    <motion.div
      key={"slet-game"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    <Stack direction={"column"} spacing={2} justifyContent={"space-around"}
      alignItems={"center"}
      sx={{flexWrap: "wrap", p:1.2}}
    >
      <Typography variant={"h2"}> Game mode </Typography>
      <GameModesAccordion timedSettings={timedPlaySettings} freeSettings={freePlaySettings}/>
    </Stack>
    </motion.div>
  );
};


const GameModesAccordion = ({}: IGameModesAccordionProps) => {

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return(
    <AnimatePresence>
    <AccordionMotionDiv motionKey="nnn">
      <Accordion expanded={expanded === 'mode1'} onChange={handleChange('mode1')} key={"testrwerew"} motionKey={"testrwerew"}>
        <AccordionSummary aria-controls="mode1d-content" id="mode1d-header" >
          <Typography sx={{flex: "1 1 auto"}}>Free Play</Typography>
          <Typography sx={{flex: "1 1 auto", display: {xs: "none", md: "block"}}}>Play a standard session of trivia</Typography>
          <RouterLinkButton to={"../free_setup"} sx={{flex: "2 1 auto"}} endIcon={<PlayCircleIcon />}> Play </RouterLinkButton>
          <RespRouterLinkButton to={"../free"} sx={{flex: "2 1 auto"}} endIcon={<ReplayIcon />} color={"primary"}> Replay </RespRouterLinkButton>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'mode2'} onChange={handleChange('mode2')} key={"heweewllo"} motionKey={"heweewllo"}>
        <AccordionSummary aria-controls="mode21d-content" id="mode2d-header">
          <Typography sx={{flex: "1 1 auto"}}>Timed Play</Typography>
          <Typography sx={{flex: "1 1 auto", display: {xs: "none", md: "block"}}}>Play a Timed session of trivia</Typography>
          <RouterLinkButton to={"../timed_setup"} sx={{flex: "2 1 auto"}} endIcon={<PlayCircleIcon />}> Play </RouterLinkButton>
          <RespRouterLinkButton to={"../timed"} sx={{flex: "2 1 auto"}} endIcon={<ReplayIcon />} color={"primary"}> Replay </RespRouterLinkButton>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </AccordionMotionDiv>
    </AnimatePresence>
  );
}