// material
import {
  Stack, Box
} from "@mui/material";
// animate
import { AnimatePresence } from "framer-motion";
// router
import {
  Route, Routes
} from "react-router-dom";
// util
import { useDarkMode } from './components/themeprovider/ThemeProviderContext';
// comps
import Navbar from "./components/nav/Navbar";
import Home from './components/home/Home';
import Play from './components/play/Play';
import TimedPlay from './components/play/sub/TimedPlay';
import TimedPlaySetup from './components/play/setup/TimedPlaySetup';
import FreePlay from './components/play/sub/FreePlay';
import FreePlaySetup from './components/play/setup/FreePlaySetup';
import SelectGameMode from './components/play/sub/GameMode';
import About from './components/about/About';
// backgroung image url
// import blackbg from '../public/dark.jpg';
// import whitebg from '../public/white.jpg';

export default function App() {
  const { darkMode } = useDarkMode();

  return (
    <Box sx={{
      minHeight: "100vh",
      backgroundImage: darkMode ? `url("/backg/dark.jpg")` : `url("/backg/white.jpg")`,
      backgroundSize: "cover"
    }}>
      <Stack spacing={4} justifyContent={"flex-start"} alignItems={"center"} sx={{minHeight: "100vh", p:1}}>
        <Navbar />
        <Box sx={{ flex: "2 1 auto", justifyContent: "center", width: "100%"}}>
          <AnimatePresence mode={"wait"}>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="about" element={<About />}/>
              <Route path="play" element={<Play />} >
                <Route path="mode" element={<SelectGameMode />}/>
                <Route path="timed" element={<TimedPlay />}/>
                <Route path="timed_setup" element={<TimedPlaySetup />}/>
                <Route path="free" element={<FreePlay />}/>
                <Route path="free_setup" element={<FreePlaySetup />}/>
              </Route>
            </Routes>
          </AnimatePresence>
        </Box>
      </Stack>
    </Box>
  )
};
