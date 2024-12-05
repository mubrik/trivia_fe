import {useState} from 'react';
import {useNavigate} from 'react-router';
import {Stack, TextField, Button, Typography, Box} from '@mui/material';
// comps, hooks

import {useAppStore} from '@context/storeProvider';
import {CustomDifficultySelect, CustomMultiSelect, AnswerModeOption, StyledOptionDiv} from './CustomSetupComps';
// query
import { useFetchTriviaTags, useFetchTriviaCategories } from "@service/queries/trivia.queries";

export default function TimedPlaySetup() {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  // store
  const {dispatchToStore, timedPlaySettings} = useAppStore();
  // tags
  const {data: tags} = useFetchTriviaTags();
  const {data: categories} = useFetchTriviaCategories();
  // nav
  const navigate = useNavigate();

  const handleStartGame = () => {
    // dispatchToStore({
    //   type: "UPDATE_TIMED_SETTINGS",
    //   settings: {minutes, seconds}
    // });

    navigate('../timed');
  };

  const handleTimeChange = (type: 'sec' | 'min', value: string) => {
    if (type === 'min') {
      const _min = Number(value);
      dispatchToStore({
        type: 'UPDATE_TIMED_SETTINGS',
        settings: {
          minutes: _min < 0 || Number.isNaN(_min) ? 0 : _min > 3 ? 3 : _min,
        },
      });

      return;
    } else {
      const _sec = Number(value);
      dispatchToStore({
        type: 'UPDATE_TIMED_SETTINGS',
        settings: {
          seconds: _sec < 0 || Number.isNaN(_sec) ? 0 : _sec > 60 ? 60 : _sec,
        },
      });
    }
  };

  const handleChange = (type: 'cat' | 'tag' | 'limit' | 'min' | 'sec', value: string | string[]) => {
    switch (type) {
      case 'cat':
        dispatchToStore({
          type: 'UPDATE_TIMED_SETTINGS',
          settings: {
            categories: typeof value === 'string' ? value.split(',') : value,
          },
        });
        // setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
        break;

      case 'tag':
        dispatchToStore({
          type: 'UPDATE_TIMED_SETTINGS',
          settings: {
            tags: typeof value === 'string' ? value.split(',') : value,
          },
        });
        // setSelectedTags(typeof v12alue === 'string' ? value.split(',') : value);
        break;

      case 'limit':
        const _amt = Number(value as string);
        dispatchToStore({
          type: 'UPDATE_TIMED_SETTINGS',
          settings: {
            // check amt is less than 5 or over 30
            limit: _amt < 5 || Number.isNaN(_amt) ? 5 : _amt > 30 ? 30 : _amt,
          },
        });
        break;

      case 'min':
        const _min = Number(value as string);
        dispatchToStore({
          type: 'UPDATE_TIMED_SETTINGS',
          settings: {
            minutes: _min < 0 || Number.isNaN(_min) ? 0 : _min > 3 ? 3 : _min,
          },
        });
        break;

      case 'sec':
        const _sec = Number(value);
        dispatchToStore({
          type: 'UPDATE_TIMED_SETTINGS',
          settings: {
            seconds: _sec < 5 || Number.isNaN(_sec) ? 5 : _sec > 60 ? 60 : _sec,
          },
        });
        break;

      default:
        break;
    }
  };

  const handleClear = (type: 'cat' | 'tag') => {
    switch (type) {
      case 'cat':
        dispatchToStore({
          type: 'UPDATE_TIMED_SETTINGS',
          settings: {
            categories: [],
          },
        });
        break;

      case 'tag':
        dispatchToStore({
          type: 'UPDATE_TIMED_SETTINGS',
          settings: {
            tags: [],
          },
        });
        break;

      default:
        break;
    }
  };

  return (
    <Stack direction={'column'} justifyContent={'flex-start'} height={'100%'}>
      <Box alignSelf={'center'} sx={{p: 1}}>
        <Typography variant={'h6'}> Game Setup </Typography>
      </Box>
      <StyledOptionDiv>
        <Typography variant={'caption'} gutterBottom={true} sx={{marginBottom: 2}}>
          {' '}
          Time{' '}
        </Typography>
        <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'center'}>
          <TextField
            id="outlined-minutes"
            label="Minutes"
            type="number"
            value={timedPlaySettings.minutes}
            InputLabelProps={{shrink: true}}
            onChange={(e) => handleChange('min', e.target.value)}
            sx={{m: 1}}
          />
          <TextField
            id="outlined-seconds"
            label="Seconds"
            type="number"
            value={timedPlaySettings.seconds}
            InputLabelProps={{shrink: true}}
            onChange={(e) => handleChange('sec', e.target.value)}
            sx={{m: 1}}
          />
        </Stack>
      </StyledOptionDiv>
      <StyledOptionDiv>
        <AnswerModeOption
          value={timedPlaySettings.displayAnswer}
          onChange={(value) =>
            dispatchToStore({
              type: 'UPDATE_TIMED_SETTINGS',
              settings: {
                displayAnswer: value,
              },
            })
          }
        />
      </StyledOptionDiv>
      <StyledOptionDiv>
        {/* <Typography variant={"caption"} gutterBottom={true} sx={{marginBottom: 2}}> General </Typography> */}
        {/* <Stack direction={"row"}> */}
        <CustomMultiSelect
          label={'Tags'}
          items={tags}
          selecteditems={timedPlaySettings.tags}
          onChange={handleChange}
          onClear={handleClear}
          type={'tag'}
        />
        <CustomMultiSelect
          label={'Categories'}
          items={categories}
          selecteditems={timedPlaySettings.categories}
          onChange={handleChange}
          onClear={handleClear}
          type={'cat'}
        />
        <CustomDifficultySelect
          label={'Difficulty'}
          difficulty={timedPlaySettings.difficulty}
          onChange={(value) =>
            dispatchToStore({
              type: 'UPDATE_TIMED_SETTINGS',
              settings: {
                difficulty: value,
              },
            })
          }
        />
        {/* </Stack> */}
      </StyledOptionDiv>
      <Button onClick={handleStartGame}> Start Game </Button>
    </Stack>
  );
}
