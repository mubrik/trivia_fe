import {useEffect, useMemo, useState} from 'react';
import {Button, Paper, Stack, Typography, Avatar} from '@mui/material';
import {IAskQuestionProps, IQuestion} from '../../compTypes';
// class
import {AnsQuestion} from '../playClasses';
// hooks
import useStopwatch from '../hooks/useStopwatch';
// animation
import {AnimatePresence, motion} from 'framer-motion';
import {shuffle, indexToOption} from '../../utils';

export default function AskQuestion({displayAnswer, question, storeAnsQuestion, onAnswer}: IAskQuestionProps) {
  const [answerMode, setAnswerMode] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);

  // stop watch
  const {calculateElapsedTime, startStopwatch, resetStopwatch} = useStopwatch();

  // starts counting on mount
  useEffect(() => {
    startStopwatch();

    return () => resetStopwatch();
  }, []);

  // effect for switching after answer is displayed
  /* useEffect(() => {
    if (displayAnswer && answerMode) {
      const timer = setTimeout(() => {
        // run handle after answer
        onAnswer ? onAnswer() : null;
      }, 2800);

      return () => clearTimeout(timer);
    }
  }, [displayAnswer, answerMode]); */

  const isGuessCorrect = (guess: string) => {
    // simple check for now
    return question.correctAnswer === guess;
  };

  const handleVerifyAnswer = (_selectedOption: string) => {
    const selectedAnswer = _selectedOption;
    // verify
    const result = isGuessCorrect(selectedAnswer);
    // store
    storeAnsQuestion(new AnsQuestion(question.id, selectedAnswer, calculateElapsedTime(), result));

    if (displayAnswer) {
      // return for now
      setAnswerMode(true);
      setAnswerIsCorrect(result);
      return;
    }

    // perform next action
    onAnswer ? onAnswer() : null;
  };

  const memoizedAnswers = useMemo(() => {
    return shuffle([...question.incorrectAnswers, question.correctAnswer]);
  }, [question]);

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        mt: {xs: 1.2, sm: 0.8}, // move paper down a bit to not obstruct timer
        minWidth: '60%',
        minHeight: '40vh',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        ...answerMode ? {bgcolor: answerIsCorrect ? "#c8e6c9" : "#ff9e80"} : undefined
      }}
    >
      <AnimatePresence mode={'wait'}>
        {!answerMode ? (
          <motion.div
            key={`ques-${question.id}-que`}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={displayAnswer ? {scale: 0} : {opacity: 0}}
          >
            <Stack direction={'column'} spacing={6} justifyContent={'center'} alignItems={'center'}>
              <Typography> {question.question} </Typography>
              {/* chck if an answer is long */}
              <Stack
                direction={question.correctAnswer.length > 40 ? {lg: 'row', xl: 'column'} : {sm: 'column', tab: 'row'}}
                spacing={4}
                useFlexGap
              >
                {memoizedAnswers.map((option, index) => (
                  <Stack direction={'row'} spacing={2} alignItems={"center"}>
                    <Avatar sx={{width: 24, height: 24, fontSize: 12 }}>{indexToOption(index)}</Avatar>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleVerifyAnswer(option);
                      }}
                      key={index}
                      sx={{marginTop: {xs: 2, tab: 0}}}
                    >
                      {option}
                    </Button>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </motion.div>
        ) : (
          <motion.div
            key={`ques-${question.id}-ans`}
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0}}
          >
            <RenderAnswer answers={memoizedAnswers} question={question} isCorrect={answerIsCorrect} onAnswer={onAnswer}  />
          </motion.div>
        )}
      </AnimatePresence>
    </Paper>
  );
}

interface IRenderAnswerProps {
  answers: string[];
  question: IQuestion;
  isCorrect?: boolean;
  onAnswer?: () => void;
}

const RenderAnswer = ({question, isCorrect, onAnswer, answers}: IRenderAnswerProps) => {
  return (
    <Stack
      direction={'column'}
      spacing={4}
      justifyContent={'center'}
      alignItems={'center'}
      color={"black"}
    >
      <Typography> Q: {question.question}</Typography>
      <Typography> The correct answer is: </Typography>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Avatar sx={{width: 24, height: 24, fontSize: 12, bgcolor: isCorrect ? "#4caf50" : "#ff3d00" }}>
          {indexToOption(answers.indexOf(question.correctAnswer))}
        </Avatar>
        <Typography variant="h6">{question.correctAnswer}</Typography>
      </Stack>
      <Button variant="contained" color={isCorrect ? "success" : "error"} onClick={() => {onAnswer && onAnswer()}} >
        continue
      </Button>
    </Stack>
  );
};
