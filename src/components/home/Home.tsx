// animte
import { motion } from "framer-motion";
// nav to
import { useNavigate } from "react-router";
// material
import {
  Button, Stack, Divider, Box,
  Typography
} from "@mui/material";
//types
import { ValidRoutes } from "../compTypes";
// styled comps
import { MainBlurShadowContainer } from "../utils/customStyledComps";

export default function Home () {

  const navigate = useNavigate();

  const handleNavClick = (mode: ValidRoutes) => {
    navigate(`/play/${mode}`);
  };

  return(
    <motion.div
      key={"home"}
      style={{width: "100%"}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MainBlurShadowContainer>
        <Stack direction={"row"} spacing={2} justifyContent={"space-around"}
          alignItems={"center"}
          sx={{flexWrap: "wrap", p:1.2, overflow: "hidden", width: "100%"}}
        >
          <Stack direction={"column"} spacing={2} padding={1}>
            <Box>
              <Typography variant="h1"> Welcome to Trivial </Typography>
            </Box>
            <Box>
              <Typography variant="body1"> Everything is a trivia. </Typography>
              <Typography variant="body1"> Fire up a quick game. </Typography>
              <Typography variant="body1"> Love to be challenged? Play a timed game to push your quick thinking </Typography>
            </Box>
          </Stack>
          <Stack spacing={2} sx={{p:3,}}
            direction={{xs: "row", lg: "column"}}
            divider={<Divider orientation="vertical" flexItem/>}
          >
            <Button onClick={() => handleNavClick("timed_setup")} variant={"outlined"}> Play timed </Button>
            <Button onClick={() => handleNavClick("free_setup")} variant={"outlined"}> Play free </Button>
          </Stack>
        </Stack>
      </MainBlurShadowContainer>
    </motion.div>
  );
};