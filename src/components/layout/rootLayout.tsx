import {Stack, Box} from '@mui/material';
import {AnimatePresence} from 'framer-motion';
import {Outlet} from 'react-router';
/* custom comps */
import useGetColorScheme from '@hooks/useGetColorSheme';
import Navbar from '@components/nav/Navbar';

export function RootLayout() {
  const {colorMode} = useGetColorScheme();

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: colorMode === 'dark' ? `url("/backg/dark.jpg")` : `url("/backg/white.jpg")`,
        backgroundSize: 'cover',
      }}
    >
      <Stack spacing={4} justifyContent={'flex-start'} alignItems={'center'} sx={{height: '100%', p: 1}}>
        <Navbar />
        <AnimatePresence mode={'wait'}>
          <Outlet />
        </AnimatePresence>
      </Stack>
    </Box>
  );
}
