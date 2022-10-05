import { useState, useEffect } from "react";
// router
import { useLocation, useMatch, Outlet, useNavigate } from "react-router-dom";
// animte
import { motion } from "framer-motion";
// material
import { 
  Button, Stack, Typography, Container 
} from "@mui/material";
// store
import { useStore } from "../store/StoreContext";
// query
import { useQueryClient } from "@tanstack/react-query";
// styled comps
import { MainBlurShadowContainer } from "../utils/customStyledComps";

export default function Play () {

  const isFreePlay = useMatch("play/free");
  const isTimedPlay = useMatch("play/timed");

  const isPlaying = !!(isFreePlay || isTimedPlay);

  return(
    <motion.div
      key={"play"}
      initial={{ opacity: 0, height: "100%" }}
      animate={{ opacity: 1, height: "100%" }}
      exit={{ opacity: 0 }}
    >
      <MainBlurShadowContainer disableShadow={isPlaying}>
        <Outlet />
      </MainBlurShadowContainer>
    </motion.div>
  );
};
