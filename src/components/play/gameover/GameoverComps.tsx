import type React from "react";
// material
import { styled } from '@mui/material/styles';
import { 
  Container, Stack, Typography, Paper, PaperProps,
  StackProps
} from "@mui/material";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
// motion
import { motion, Variants } from "framer-motion";

// consts
const ACC_BACKG_COLOR = `linear-gradient(90deg, rgb(218 218 229) 0%, rgba(227,227,233,0.927608543417367) 57%,
rgb(182 210 227 / 0%) 100%)`;

// generic react prop
interface GenericProps {
  children?: React.ReactNode;
}

interface IMotionItemProps {
  motionKey: string;
}

interface IGameOverPaperProps {
  status?: "success" | "fail";
}

interface ITitleAndDetailProps {
  title: string;
  detail: string;
}

const accordionListVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1,
    overflowY: "hidden",
    transition: {
      staggerChildren: 0.1, when: "beforeChildren"
    }
  },
  exit: { opacity: 0 }
};

const accordionItemVariants: Variants = {
  hidden: { y: 800, opacity: 0 },
  visible: { y: 0, opacity: 1, width: "100%", transition: {
    type: 'tween', duration: 0.3, ease: "easeInOut"}
  },
  exit: {y: -300, opacity: 0 },
};

export const MotionAnimateListDiv = ({ children, motionKey }: GenericProps & IMotionItemProps) => {

  return(
    <motion.div
      key={motionKey}
      variants={accordionListVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Stack
        direction={"column"} spacing={2}
        alignItems={"center"}
        sx={{p:1.2}}
      >
        { children }
      </Stack>
    </motion.div>
  );
};

export const GameOverMotionPaper = styled((props: PaperProps & IMotionItemProps & IGameOverPaperProps ) => {

  const { motionKey, ...rest} = props;

  return(
    <motion.div
      key={motionKey}
      variants={accordionItemVariants}
    >
      <Paper elevation={2} sx={{p: 1.2, minWidth: "80%"}} {...rest} />
    </motion.div>
  );
})(({ theme, status }) => ({
  border: typeof status === "undefined" ? undefined :
    status === "success" ? `1px solid ${theme.palette.success.main}` : 
    `1px solid ${theme.palette.secondary.main}`
}));

export const GameOverAccordion = styled((props: AccordionProps & IMotionItemProps) => {
  const { motionKey, ...rest} = props;

  return(
    <motion.div
      key={motionKey}
      variants={accordionItemVariants}
    >
      <MuiAccordion disableGutters elevation={1} {...rest} />
    </motion.div>
  )
})(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

export const GameOverAccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem'}} />}
    {...props}
  />
))(({ theme }) => ({
  background:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : ACC_BACKG_COLOR,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    alignItems: "center"
  },
}));

export const GameOverAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const TitleAndDetailTypography = ({title, detail, ...rest}: ITitleAndDetailProps & StackProps) => {
  return(
    <Stack direction={{xs: "column", md: "row"}} spacing={2} justifyContent={"start"} {...rest}>
      <Typography> {title}: </Typography>
      <Typography> {detail} </Typography>
    </Stack>
  );
};