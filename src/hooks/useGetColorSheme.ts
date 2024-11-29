import {useColorScheme} from '@mui/material';

export default function useGetColorScheme() {
  const {mode, systemMode, setMode} = useColorScheme();

  const _mode = !mode ? 'dark' : mode === 'system' ? systemMode : mode;

  return {colorMode: _mode as 'dark' | 'light', setMode};
}
