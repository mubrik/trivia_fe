import {useMatch, Outlet} from 'react-router';
import {motion} from 'framer-motion';
// styled comps
import {MainBlurShadowContainer, MainIsPlayingContainer} from '../utils/customStyledComps';

export default function Play() {
  const isFreePlay = useMatch('play/free');
  const isTimedPlay = useMatch('play/timed');

  const isPlaying = !!(isFreePlay || isTimedPlay);

  return (
    <motion.div
      key={'play'}
      initial={{opacity: 0, height: '100%', width: '100%'}}
      animate={{opacity: 1, height: '100%', width: '100%'}}
      exit={{opacity: 0}}
    >
      {isPlaying ? (
        <MainIsPlayingContainer>
          <Outlet />
        </MainIsPlayingContainer>
      ) : (
        <MainBlurShadowContainer disableShadow={isPlaying}>
          <Outlet />
        </MainBlurShadowContainer>
      )}
    </motion.div>
  );
}
