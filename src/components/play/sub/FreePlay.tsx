import { useState, useEffect, useRef } from "react";
// router
import { useNavigate } from "react-router-dom";
// material
import { 
  Stack, Button, Box, CircularProgressProps,
  CircularProgress, Typography 
} from "@mui/material";
// animate
import { motion, AnimatePresence } from "framer-motion";
// comps
import AskQuestionList from "../question/AskQuestionList";
import Gameover from "../gameover/Gameover";
import { 
  StyledQuestionBoxDiv, StyledFullWidthMotionDiv,
  LinearLoading, StyledCountownPositionDiv
} from "../setup/CustomSetupComps";
import ErrorPage from "../../error/ErrorPage";
// hooks
import useStopwatch from "../hooks/useStopwatch";
import useMutableStore from "../hooks/useMutableStore";
// store
import { useStore } from "../../store/StoreContext";
// dummy service
import dummyData from "../../../service/dummy-json.json";
// service query
import { useFreeTriviaQuestions } from "../queries/queries";
// types
import type { 
  IAnsweredQuestion, IQuestion, timedGameState 
} from "../../compTypes";

export default function FreePlayDataComp () {
  // get settings
  const { freePlaySettings } = useStore();
  // makequery request
  const { data, isFetching, isLoading, isError } = useFreeTriviaQuestions(freePlaySettings);
  // loading
  if (isFetching || isLoading) {
    return(
      <LinearLoading />
    );
  }
  // error
  if (isError) {
    return(
      <ErrorPage />
    );
  }
  // only return comp if datat available
  return(
    <FreePlay questions={data}/>
  );
};

function FreePlay ({ questions }: {questions: IQuestion[]}) {

  // questions data, dummy data for now, react-query later
  // const questions = dummyData["data"];
  // state
  const [gameState, setGameState] = useState<timedGameState>("idle");
  const [currQuestionValue, setCurrQuestionValue] = useState(1);
  // store
  const { freePlaySettings } = useStore();
  // nav
  const navigate = useNavigate();
  const { startStopwatch, resetStopwatch, calculateElapsedTime } = useStopwatch();
  // not necessary for rendering so using a mutable ref as store of answered questions
  const { 
    getMutableStoreValue: gMStore, addMutableStore: aMStore
  } = useMutableStore<IAnsweredQuestion>([]);

  // effect check if exist, nav to setup if not
  useEffect(() => {
    if (typeof freePlaySettings === "undefined") {
      navigate("../free_setup", {replace: true});
    }
  }, [freePlaySettings]);

  // effect for starting countdown
  useEffect(() => {
    if (freePlaySettings && questions) {
      // start
      setGameState("inPlay");
      startStopwatch();
    }

    return () => {
      setGameState("idle");
      resetStopwatch();
    };

  }, [freePlaySettings, questions]);

  // call backs
  const handleQuestionAnswered = (param: IAnsweredQuestion) => {
    // add question to Mstore
    aMStore(param);
    // do ther stuff
    setCurrQuestionValue(prev => prev + 1);
  };

  return(
    <StyledFullWidthMotionDiv motionKey="free-play">
      { gameState === "end" ?
          <Gameover 
            gamemode={"free"} 
            questionResults={gMStore()} 
            completionTime={calculateElapsedTime()} 
          /> :
        gameState === "inPlay" && questions ?
          <Stack
            justifyContent="center"
            alignItems="center"
            direction={"row"}
            spacing={2}
          >
            <StyledQuestionBoxDiv>
              {
                questions.length > 0 ?
                <>
                  <StyledCountownPositionDiv>
                    <CircularProgressWithLabel value={currQuestionValue} questionLength={questions.length}/>
                  </StyledCountownPositionDiv>
                  <AskQuestionList 
                    questions={questions}
                    storeAnsQuestion={handleQuestionAnswered}
                    gameState={gameState}
                    setGameState={setGameState}
                    displayAnswer={freePlaySettings.displayAnswer}
                  />
                </> : 
                null
              }
            </StyledQuestionBoxDiv>
          </Stack> :
          null // for now
      }
    </StyledFullWidthMotionDiv>
  );
};

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number, questionLength: number }
) {
  // value questions len 5 to 30, but progress is determined by 1 to 100
  // dividing 100 by qustion length then multiply ans by curr value 
  const multiBy = Math.floor(100 / props.questionLength);

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={props.value * multiBy} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="body1"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}`}</Typography>
      </Box>
    </Box>
  );
};
