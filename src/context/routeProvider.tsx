import {Route, Routes, BrowserRouter} from "react-router";
// layout
import { RootLayout } from "@components/layout/rootLayout";
// comps
import Home from '@components/home/Home';
import Play from '@components/play/Play';
import TimedPlay from '@components/play/sub/TimedPlay';
import TimedPlaySetup from '@components/play/setup/TimedPlaySetup';
import FreePlay from '@components/play/sub/FreePlay';
import FreePlaySetup from '@components/play/setup/FreePlaySetup';
import SelectGameMode from '@components/play/sub/GameMode';
import About from '@components/about/About';

export function AppRouterProvider () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />}/>
          <Route path="play" element={<Play />} >
            <Route path="mode" element={<SelectGameMode />}/>
            <Route path="timed" element={<TimedPlay />}/>
            <Route path="timed_setup" element={<TimedPlaySetup />}/>
            <Route path="free" element={<FreePlay />}/>
            <Route path="free_setup" element={<FreePlaySetup />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
};
