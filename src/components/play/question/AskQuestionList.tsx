import { useState, useEffect } from "react";
// material
import { Stack, Button } from "@mui/material";
// custom comp
import AskQuestion from "./AskQuestion";
// animate
import { AnimatePresence, motion } from "framer-motion";
// type
import { IAskQuestionListProps } from "../../compTypes";

export default function AskQuestionList (
  {
    questions, storeAnsQuestion, setGameState,
    displayAnswer
  }: IAskQuestionListProps
) {

  // const questions = dummyData["data"];
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

  const goNextQuestion = () => {
    // implement last question check logic
    if (questions.length - 1 === currQuestionIndex) {
      // end game
      setGameState("end");
      return;
    }

    setCurrQuestionIndex(prev => prev + 1);
  };

  const goPrevQuestion = () => {
    setCurrQuestionIndex(prev => prev - 1);
  };

  // effect for monitoring game state
  useEffect(() => {

  }, []);

  return(
    <Stack direction={"column"} sx={{width: "100%", position: "relative"}}>
      <AnimatePresence initial={false} mode={"wait"}>
        <motion.div
          key={`${currQuestionIndex}-${questions[currQuestionIndex].id}`}
          initial={{ x: 300, opacity: 0}}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0, }}
          transition={{ type: 'spring', duration: 0.5, mass: 0.3 }}
        >
          <AskQuestion 
            mode={"timed"} 
            question={questions[currQuestionIndex]}
            storeAnsQuestion={storeAnsQuestion}
            onAnswer={goNextQuestion}
            displayAnswer={displayAnswer}
          />
        </motion.div>
      </AnimatePresence>
      {/* <Stack spacing={2} direction={"row"}>
        <Button variant="contained" onClick={() => goPrevQuestion()} disabled={currQuestionIndex === 0}> Prev </Button>
        <Button variant="contained" onClick={() => goNextQuestion()} disabled={questions.length - 1 === currQuestionIndex}> Next </Button>
      </Stack> */}
    </Stack>
  );


};