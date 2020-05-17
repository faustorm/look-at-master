import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants/dimensions';
import colors from '../../constants/colors';

export default {
  cover: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  logo: {
    flex: 1,
    maxHeight: 220,
    resizeMode: 'contain',
    width: SCREEN_WIDTH * 0.60,
    marginHorizontal: SCREEN_WIDTH * 0.15,
  },
  authBox: {
    backgroundColor: colors.regularBackground,
    borderRadius: 5,
  },
};
