import { useState, useMemo } from "react";
// material
import {
  Stack, Box, Typography, Button
} from "@mui/material";
// router
import { useQueryClient } from "@tanstack/react-query";
// comps
import {
  MotionAnimateListDiv, GameOverMotionPaper, GameOverAccordion,
  GameOverAccordionDetails, GameOverAccordionSummary,
  TitleAndDetailTypography
} from "./GameoverComps";
// type
import { IAnsweredQuestion, IGameOverProps, IQuestion } from "../../compTypes";
// utils
import { getFastestQuestion, getSlowestQuestion } from "./gameoverUtils";

export default function Gameover ({
  gamemode, questionResults, completionTime
}: IGameOverProps) {

  console.log(questionResults);
  
  const passedQuestions = useMemo(() => {
    return questionResults.filter(ansQuestion => ansQuestion.isCorrect);
  }, [questionResults]);
  
  const failedQuestions = useMemo(() => {
    return questionResults.filter(ansQuestion => !ansQuestion.isCorrect);
  }, [questionResults]);

  const _moreFail = failedQuestions.length > passedQuestions.length;
  const _morePass = passedQuestions.length > failedQuestions.length;
  const _passAll = passedQuestions.length === questionResults.length;
  const _failAll = failedQuestions.length === questionResults.length;

  let headText: string;

  // placeholder text, use a function later to get more random texts and make it a tuple
  headText = _failAll ? "You weren't trying were you?" : _passAll ? "Stop Cheating" :
    _moreFail ? "Git Gud" : "Keep Going!";


  return(
    <MotionAnimateListDiv motionKey="gamover-vv">
      <Stack spacing={2}>
        <Box>
          <Typography variant={"h2"}> { headText } </Typography>
        </Box>
      </Stack>
      <GameOverMotionPaper motionKey="number">
        <Typography variant={"subtitle1"}>
          You Completed {questionResults.length} questions
        </Typography>
      </GameOverMotionPaper>
      <GameOverMotionPaper motionKey="passed" status={passedQuestions.length > 0 ? "success" : "fail"}>
        <Typography variant={"subtitle1"}> Passed: { passedQuestions.length } </Typography>
      </GameOverMotionPaper>
      <GameOverMotionPaper motionKey="fail" status={failedQuestions.length > 0 ? "fail" : "success"}>
        <Typography variant={"subtitle1"}> Failed: { failedQuestions.length  } </Typography>
      </GameOverMotionPaper>
      {
        (gamemode === "timed") ?
          <GameOverMotionPaper motionKey="timed-complete">
            <Typography> Completed with { completionTime } seconds to spare </Typography>
          </GameOverMotionPaper> : 
        (gamemode === "free") ? 
          <GameOverMotionPaper motionKey="free-complete">
            <Typography> Completed in { completionTime } seconds </Typography>
          </GameOverMotionPaper> : null
      }
      <AnswerStats gamemode={gamemode} questionResults={questionResults} completionTime={completionTime}/>
      <ReplayGame mode={gamemode} />
    </MotionAnimateListDiv>
  );
};

const AnswerStats = ({questionResults, gamemode}:IGameOverProps) => {

  // query client
  const queryClient = useQueryClient();
  // get query data
  const queryData = queryClient.getQueryData<IQuestion[]|undefined>([`trivia-${gamemode}`], {exact: false});
  // expanded accordion state
  const [expanded, setExpanded] = useState<string | false>(false);
  // on change
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const fastestQuestion: IAnsweredQuestion & Partial<IQuestion> = useMemo(() => {
    const _ques = getFastestQuestion(questionResults);
    console.log(_ques);

    if (queryData) {
      // find question
      const question = queryData.find(_question => _ques.questionId === _question.id);
      // return all
      if (question) {
        return {
          ..._ques,
          ...question
        };
      }
    }

    return _ques;
  }, []);

  const slowestQuestion: IAnsweredQuestion & Partial<IQuestion> = useMemo(() => {
    
    const _ques = getSlowestQuestion(questionResults);

    if (queryData) {
      // find question
      const question = queryData.find(_question => _ques.questionId === _question.id);
      // return all
      if (question) {
        return {
          ..._ques,
          ...question
        };
      }
    }

    return _ques;
  }, []);

  return(
    <>
    {
      fastestQuestion.question ?
        <GameOverAccordion expanded={expanded === 'fast1'} onChange={handleChange('fast1')} key={"testrwerew"} motionKey={"fast-quest"}>
          <GameOverAccordionSummary aria-controls="fast1-content" id="fast1-header" >
            <Typography sx={{flex: "1 1 auto"}}>Fastest Question:</Typography>
            <Typography sx={{
              flex: "1 1 auto", display: {xs: "none", md: "block"},
              whiteSpace: "nowrap", textOverflow: "ellipsis"
            }}>
              {fastestQuestion.question}
            </Typography>
          </GameOverAccordionSummary>
          <GameOverAccordionDetails>
            <TitleAndDetailTypography title="Question" detail={fastestQuestion.question} sx={{display: {xs: "block", md: "none"}}}/>
            {
              fastestQuestion.playerAnswer ?
                <TitleAndDetailTypography title="Your answer" detail={fastestQuestion.playerAnswer}/> : null
            }
            {
              fastestQuestion.correctAnswer ?
                <TitleAndDetailTypography title="Solution" detail={fastestQuestion.correctAnswer}/> : null
            }
            {
              fastestQuestion.category ?
                <TitleAndDetailTypography title="Category" detail={fastestQuestion.category}/> : null
            }
          </GameOverAccordionDetails>
        </GameOverAccordion> :
      null
    }
    {
      slowestQuestion.question ?
        <GameOverAccordion expanded={expanded === 'slow1'} onChange={handleChange('slow1')} key={"testrwerew"} motionKey={"slow-quest"}>
          <GameOverAccordionSummary aria-controls="slow1-content" id="slow1-header" >
            <Typography sx={{flex: "1 1 auto"}}>Slowest Question:</Typography>
            <Typography sx={{
              flex: "1 1 auto", display: {xs: "none", md: "block"},
              whiteSpace: "nowrap", textOverflow: "ellipsis"
            }}>
              {slowestQuestion.question}
            </Typography>
          </GameOverAccordionSummary>
          <GameOverAccordionDetails>
            <TitleAndDetailTypography title="Question" detail={slowestQuestion.question} sx={{display: {xs: "block", md: "none"}}}/>
            {
              slowestQuestion.playerAnswer ?
                <TitleAndDetailTypography title="Your answer" detail={slowestQuestion.playerAnswer}/> : null
            }
            {
              slowestQuestion.correctAnswer ?
                <TitleAndDetailTypography title="Solution" detail={slowestQuestion.correctAnswer}/> : null
            }
            {
              slowestQuestion.category ?
                <TitleAndDetailTypography title="Category" detail={slowestQuestion.category}/> : null
            }
          </GameOverAccordionDetails>
        </GameOverAccordion> :
      null
    }
    </>
  );
};

const ReplayGame = ({mode}:{mode: IGameOverProps["gamemode"]}) => {

  // query client
  const queryClient = useQueryClient();

  // function to invalidate query, causing reload
  const invalidateQuery = (_mode: typeof mode) => {
    queryClient.invalidateQueries([`trivia-${_mode}`]);
  };

  return(
    <>
      {
        (mode) ?
          <Button onClick={() => invalidateQuery(mode)} variant={"contained"}> Replay </Button>
        : null
      }
    </>
  );

};
