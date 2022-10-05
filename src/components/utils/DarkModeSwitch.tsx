// material
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
// icons
import { EmojiObjectsOutlined } from '@mui/icons-material';
// dk mode context
import { useDarkMode } from '../themeprovider/ThemeProviderContext';
// animation
import { motion } from "framer-motion";

const StyledDiv = styled("div")(({theme}) => ({
  position: "relative",
  [theme.breakpoints.up("md")]: {
    marginRight: theme.spacing(6)
  },[theme.breakpoints.up("lg")]: {
    marginRight: theme.spacing(8)
  },
}));

const DarkModeSwitch = (): JSX.Element => {
  // darkmode
  const {darkMode, setDarkMode} = useDarkMode();

  return(
    <StyledDiv>
      <motion.div
        whileTap={{
          translateX: ["3px", "-3px", "2px"],
          translateY: ["1px", "-2px", "1px"],
          rotate: ["2deg", "-1deg", "3deg"],
          scale: [1.2, 1.4, 0.7, 1]
        }}
      >
        <IconButton
          color={darkMode ? "secondary" : "primary"}
          onClick={() => setDarkMode(state => !state)}
        >
          <EmojiObjectsOutlined fontSize={"medium"}/>
        </IconButton>
      </motion.div>
    </StyledDiv>
  );
};

export default DarkModeSwitch;