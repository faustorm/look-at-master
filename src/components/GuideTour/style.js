import constants from '../../constants/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants/dimensions';

export default {
  slideStyle: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
  },
  slideText: {
    fontSize: 25,
    fontWeight: '600',
    color: constants.gray,
    textAlign: 'center',
    marginBottom: 40,
  },
  imageView: {
    width: 100,
  },
  image: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_HEIGHT * 0.3,
    resizeMode: 'center',
  },
  positionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 2,
    marginTop: 20,
  },
  masterDot: {
    flexDirection: 'row',
  },
  filledDot: {
    backgroundColor: constants.gray,
  },
  emptyDot: {
    backgroundColor: constants.brand,
  },
  buttonStyle: {
    backgroundColor: constants.brand,
  },
  callButton: {
    width: SCREEN_WIDTH * 0.4,
  },
};
