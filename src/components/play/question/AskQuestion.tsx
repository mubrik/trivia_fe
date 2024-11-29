import { useEffect, useMemo, useState } from "react";
// material
import { 
  Button, Paper, Stack,
  Typography
} from "@mui/material";
// types
import { IAskQuestionProps, IQuestion } from "../../compTypes";
// class
import { AnsQuestion } from "../playClasses";
// hooks
import useStopwatch from "../hooks/useStopwatch";
// animation
import { AnimatePresence, motion } from "framer-motion";
import { shuffle } from "../../utils";

export default function AskQuestion ({
  displayAnswer,
  question,
  storeAnsQuestion,
  onAnswer,
}: IAskQuestionProps) {

  const [answerMode, setAnswerMode] = useState(false);

  // stop watch
  const {
    calculateElapsedTime, startStopwatch, resetStopwatch
  } = useStopwatch();

  // starts counting on mount
  useEffect(() => {
    startStopwatch();

    return () => resetStopwatch();
  }, []);

  // effect for switching after answer is displayed
  useEffect(() => {

    if(displayAnswer && answerMode) {
      const timer = setTimeout(() => {
        // run handle after answer
        onAnswer ? onAnswer() : null;
      }, 2800);

      return () => clearTimeout(timer);
    }

  }, [displayAnswer, answerMode]);

  const isGuessCorrect = (guess: string) => {
    // simple check for now
    return question.correctAnswer === guess;
  };

  const handleVerifyAnswer = (_selectedOption: string) => {

    const selectedAnswer = _selectedOption;
    // verify
    const result = isGuessCorrect(selectedAnswer);
    // store
    storeAnsQuestion(
      new AnsQuestion(question.id, selectedAnswer, calculateElapsedTime(), result)
    );

    if (displayAnswer) {
      // return for now
      setAnswerMode(true);
      return;
    }

    // perform next action
    onAnswer ? onAnswer() : null;
  };

  const memoizedQuestion = useMemo(() => {
    return shuffle([...question.incorrectAnswers, question.correctAnswer]);
  }, [question]);

  return(
    <Paper elevation={4}
      sx={{
        p: 2,
        minWidth: "60%",
        mt: {xs:1.2, sm: 0.8} // move paper down a bit to not obstruct timer
      }}
    >
    <AnimatePresence mode={"wait"}>
      {
        !answerMode ?
        <motion.div
          key={`ques-${question.id}-que`}
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          exit={displayAnswer ? { scale: 0 } : { opacity: 0 }}
        >
        <Stack direction={"column"} spacing={4} justifyContent={"center"} alignItems={"center"}>
          <Typography> {question.question} </Typography>
          {/* chck if an answer is long */}
          <Stack
            direction={
              question.correctAnswer.length > 40 ?
              {lg:"row", xl:"column"} : {sm:"column", tab:"row"}
            }
            spacing={2}
          >
            {
              memoizedQuestion.map((option, index) => (
                  <Button 
                    variant="outlined" 
                    onClick={() => {handleVerifyAnswer(option);}} 
                    key={index}
                    sx={{marginTop: {xs: 2, tab: 0}}}
                  > 
                    {option} 
                  </Button>
                ))
            }
          </Stack>
        </Stack>
        </motion.div> :
        <motion.div
          key={`ques-${question.id}-ans`}
          initial={{ opacity: 0, scale: 0}}
          animate={{ opacity: 1, scale: 1}}
          exit={{ opacity: 0 }}
        >
          <RenderAnswer question={question} />
        </motion.div>
      }
    </AnimatePresence>
    </Paper>
  );
};


interface IRenderAnswerProps {
  question: IQuestion;
}

const RenderAnswer = ({ question }: IRenderAnswerProps) => {

  return(
    <Stack direction={"column"} spacing={4} justifyContent={"center"} alignItems={"center"}>
      <Typography> Q: {question.question}</Typography>
      <Typography> The correct answer is: </Typography>
      <Typography variant="h6"> {question.correctAnswer} </Typography>
    </Stack>
  );
};
