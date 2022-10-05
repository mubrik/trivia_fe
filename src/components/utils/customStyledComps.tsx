import type React from "react";
// material
import { styled } from '@mui/material/styles';
import { 
  Container, Stack, Typography
} from "@mui/material";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
// motion
import { motion, Variants } from "framer-motion";

// const
const BOX_SHADOW = "0px 0px 6px #0000002b";
const ACC_BACKG_COLOR = `linear-gradient(90deg, rgb(218 218 229) 0%, rgba(227,227,233,0.927608543417367) 57%,
rgb(182 210 227 / 0%) 100%)`;

// generic react prop
interface GenericProps {
  children?: React.ReactNode;
}

interface IMotionItemProps {
  motionKey: string;
}

export const MainBlurShadowContainer = (
  // adding disable shadow to props
  props: GenericProps & {disableShadow? : boolean}
) => {

  const {children, disableShadow } = props;

  return(
    <Container maxWidth="xl" disableGutters
      sx={{
        p:{xm:0.5, sm: 0.8, md: 1.2}, 
        mt: {xs:2, md:3, lg:4},
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        backdropFilter: "blur(6px)",
        overflowX: "hidden",
        boxShadow: disableShadow ? undefined : BOX_SHADOW
      }}
    >
      { children }
    </Container>
  );
};

const accordionListVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: {staggerChildren: 0.2, when: "beforeChildren"}},
  exit: { opacity: 0 }
};

const accordionItemVariants: Variants = {
  hidden: { x: 800, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: {type: 'spring', mass: 0.8}},
  exit: {x: -300, opacity: 0 },
};

export const AccordionMotionDiv = ({ children, motionKey }: GenericProps & IMotionItemProps) => {

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

export const Accordion = styled((props: AccordionProps & IMotionItemProps) => {
  const { motionKey, ...rest} = props;

  return(
    <motion.div
      key={motionKey}
      variants={accordionItemVariants}
      // initial={{ x: 800, opacity: 0}}
      // animate={{ x: 0, opacity: 1 }}
      // exit={{ x: -300, opacity: 0, }}
      // transition={{ type: 'spring', mass: 0.8 }}
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

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
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

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
