import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  List, ListItem, ListItemText,
  useMediaQuery, useTheme, Stack
} from '@mui/material';
// animte
import { motion } from "framer-motion";
// styled comps
import { MainBlurShadowContainer } from "../utils/customStyledComps";
// social icons
import { SocialIcon } from 'react-social-icons';
import { useDarkMode } from '../themeprovider/ThemeProviderContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function VerticalTabs() {
  // tab in view
  const [value, setValue] = React.useState(0);
  // theme and query
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // handle change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, display: 'flex', flexDirection: {xs: "column", sm: "row"}}}
    >
      <Tabs
        orientation={isSmallScreen ? "horizontal" : "vertical"}
        centered={isSmallScreen}
        variant={isSmallScreen ? "fullWidth" : "scrollable"}
        value={value}
        onChange={handleChange}
        aria-label="detail tabs"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="About" {...a11yProps(0)} />
        <Tab label="Todo" {...a11yProps(1)} />
        <Tab label="Credits" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AboutDetail />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Todo />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Credits />
      </TabPanel>
    </Box>
  );
};

function AboutDetail () {

  const { darkMode } = useDarkMode();

  const animeButtonVariants = {
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        duration: 1,
        type: "spring"
      }
    }
  };

  return(
    <>
      <List dense={true}>
        <ListItem>
          <ListItemText> Built with the help of Kratos axe and a bit of typescript.</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText secondary={"Whoosh"}> I wield great powers so make sure to come back often to see it in use ... and maybe play a game or 2 </ListItemText>
        </ListItem>
        <ListItem>
          <Stack direction={"row"} spacing={2}>
          <motion.div
              variants={animeButtonVariants}
              whileHover={"hover"}
            >
              <SocialIcon
                bgColor={ darkMode ? "#00b2ffc4" : "black"}
                url={"https://github.com/mubrik"}
                title={"Github"}
              />
            </motion.div>
            <motion.div
              variants={animeButtonVariants}
              whileHover={"hover"}
            >
              <SocialIcon
                url={"mailto:mubarakg4u@gmail.com"}
                network={"email"}
                title={"Email"}
              />
            </motion.div>
            <motion.div
              variants={animeButtonVariants}
              whileHover={"hover"}
            >
              <SocialIcon
                url={"https://t.me/mubrik1"}
                network={"telegram"}
                title={"Telegram"}
              />
            </motion.div>
            <motion.div
              variants={animeButtonVariants}
              whileHover={"hover"}
            >
              <SocialIcon
                url={"https://www.linkedin.com/in/mubarakyahaya"}
                title={"LinkedIn"}
              />
            </motion.div>
          </Stack>
        </ListItem>
      </List>
    </>
  );
};

function Todo () {

  return(
    <>
      <List dense={true}>
        <ListItem>
          <ListItemText sx={{textDecoration: "line-through"}}> Create the base page</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText sx={{textDecoration: "line-through"}}> Create base game modes </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText secondary={"Wow"}> Add chaos game mode </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText> Add Authentication and Game Score Tracking </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText> Add MultiPlayer </ListItemText>
        </ListItem>
      </List>
    </>
  );
};

function Credits () {
  return (
    <>
      <List dense={true}>
        <ListItem>
          <ListItemText secondary={"https://the-trivia-api.com/"}> The Trivia API for being awesome </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText secondary={"https://www.vecteezy.com/free-vector/abstract/"}> Wallpapers by Vecteezy </ListItemText>
        </ListItem>
      </List>
    </>
  );
};

export default function About () {

  return(
    <motion.div
      key={"about-page"}
      initial={{ opacity: 0, height: "100%" }}
      animate={{ opacity: 1, height: "100%" }}
      exit={{ opacity: 0 }}
    >
      <MainBlurShadowContainer>
        <VerticalTabs />
      </MainBlurShadowContainer>
    </motion.div>
  );
};
