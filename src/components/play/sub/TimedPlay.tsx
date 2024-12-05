import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import {Stack, Box, CircularProgress, CircularProgressProps, Typography} from '@mui/material';
// comps
import AskQuestionList from '../question/AskQuestionList';
import Gameover from '../gameover/Gameover';
import {
  StyledQuestionBoxDiv,
  StyledFullWidthMotionDiv,
  StyledCountownPositionDiv,
  LinearLoading,
} from '../setup/CustomSetupComps';
import ErrorPage from '../../error/ErrorPage';
// hooks
import useCountdownTimer from '../hooks/useCountdownTimer';
import useMutableStore from '../hooks/useMutableStore';
import {useAppStore} from '@context/storeProvider';
import { useFetchTimedTriviaQuestions } from '@service/queries/trivia.queries';
import { buildUrlQuery } from '@utils/index';
// types
import type {IAnsweredQuestion, timedGameState, IQuestion} from '../../compTypes';

export default function TimedPlayDataComp() {
  const {timedPlaySettings} = useAppStore();
  const {data, isFetching, isLoading, isError, isSuccess} = useFetchTimedTriviaQuestions(buildUrlQuery(timedPlaySettings));

  if (isFetching || isLoading) {
    return <LinearLoading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (isSuccess) {
    return <TimedPlay questions={data} />;
  }

  return null;
}

const TimedPlay = ({questions}: {questions: IQuestion[]}) => {
  // questions data, dummy data for now, react-query later
  // const questions = dummyData["data"];
  // state
  const [gameState, setGameState] = useState<timedGameState>('idle');
  // store
  const {timedPlaySettings} = useAppStore();
  // nav
  const navigate = useNavigate();
  // timer for game
  const {countdownInSeconds, startCountdown, stopCountdown, resetCountdown} = useCountdownTimer(timedPlaySettings);
  // not necessary for rendering so using a mutable ref as store of answered questions
  const {getMutableStoreValue: gMStore, addMutableStore: aMStore} = useMutableStore<IAnsweredQuestion>([]);

  // effect check if settings exist, nav to setup if not
  useEffect(() => {
    if (typeof timedPlaySettings === 'undefined') {
      navigate('../timed_setup', {replace: true});
    }
  }, [timedPlaySettings]);

  // effect for starting countdown
  useEffect(() => {
    if (timedPlaySettings && questions) {
      // start
      setGameState('inPlay');
      startCountdown();
    }

    return () => {
      setGameState('idle');
      resetCountdown();
    };
  }, [timedPlaySettings, questions]);

  // effect for monitoring countdown timer
  useEffect(() => {
    if (countdownInSeconds <= 0) {
      setGameState('end');
    }
  }, [countdownInSeconds]);

  // call backs
  const handleQuestionAnswered = (param: IAnsweredQuestion) => {
    // add question to Mstore
    aMStore(param);
    // do ther stuff
  };

  return (
    <StyledFullWidthMotionDiv motionKey="timed-play">
      {
        gameState === 'end' ? (
          <Gameover queryKey={buildUrlQuery(timedPlaySettings)} gamemode={'timed'} questionResults={gMStore()} completionTime={countdownInSeconds} />
        ) : gameState === 'inPlay' && questions ? (
          <Stack justifyContent="center" alignItems="center" direction={'column'} spacing={2}>
            <StyledCountownPositionDiv>
              <CircularProgressWithLabel value={countdownInSeconds} />
            </StyledCountownPositionDiv>
            {/* <Stack direction={"column"}>
                <Button variant={"outlined"} onClick={() => startCountdown()}> Start Countdown </Button>
                <Button variant={"outlined"} onClick={() => stopCountdown()}> Stop Countdown </Button>
                <Button variant={"outlined"} onClick={() => resetCountdown()}> Reset Countdown </Button>
              </Stack> */}
            <StyledQuestionBoxDiv>
              <AskQuestionList
                questions={questions}
                storeAnsQuestion={handleQuestionAnswered}
                gameState={gameState}
                setGameState={setGameState}
                displayAnswer={timedPlaySettings.displayAnswer}
              />
            </StyledQuestionBoxDiv>
          </Stack>
        ) : null // for now
      }
    </StyledFullWidthMotionDiv>
  );
};

function CircularProgressWithLabel(props: CircularProgressProps & {value: number}) {
  return (
    <Box sx={{position: 'relative', display: 'inline-flex'}}>
      <CircularProgress variant="indeterminate" {...props} />
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
        <Typography variant="body1" component="div" color="text.secondary">{`${Math.round(props.value)}`}</Typography>
      </Box>
    </Box>
  );
}
