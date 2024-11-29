// material
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
// icons
import { EmojiObjectsOutlined } from '@mui/icons-material';
// animation
import { motion } from "framer-motion";
import useGetColorScheme from '@hooks/useGetColorSheme';

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
  const {colorMode, setMode} = useGetColorScheme();

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
          color={colorMode === "dark" ? "secondary" : "primary"}
          onClick={() => setMode(colorMode === "dark" ? "light" : "dark")}
        >
          <EmojiObjectsOutlined fontSize={"medium"}/>
        </IconButton>
      </motion.div>
    </StyledDiv>
  );
};

export default DarkModeSwitch;