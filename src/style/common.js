import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants/dimensions';
import colors from '../constants/colors';
import style from '../constants/styles';

export default {
  viewTitle: {
    fontSize: style.sectionHeaderFontSize * 1.7,
    fontWeight: style.sectionHeaderFontWeight,
    color: colors.gray,
  },
  view: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.regularBackground,
  },
  overlay: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.transparentOverlay,
  },
  semiFullWidthCentered: {
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  mainCardView: {
    height: 'auto',
    marginBottom: 3,
  },
  regularChildViewPadding: {
    padding: 15,
  },
  viewPadding: {
    padding: 15,
  },
  innerViewPadding: {
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  betweenHorizontalSpace: {
    verticalAlign: 'center',
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 0,
  },
  shadow: {
    shadowColor: colors.gray,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  semiBorder: {
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
  },
  sectionView: {
    borderTopWidth: 1,
    borderColor: colors.semiTransparent,
    backgroundColor: colors.regularBackground,
  },
  highPaddingSection: {
    paddingVertical: 18,
  },
  regularHeaders: {
    headerBackTitleStyle: {
      color: colors.regularLighterText,
    },
    headerTintColor: colors.regularLighterText,
    headerTitleStyle: {
      fontWeight: style.sectionHeaderFontWeight,
      color: colors.inverseText,
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: colors.regularBackground,
    },
  },
  tabIcon: {
    history: {
      width: 21,
      height: 27,
      resizeMode: 'stretch',
    },
    home: {
      width: 30,
      height: 25,
      resizeMode: 'stretch',
    },
    profile: {
      width: 30,
      height: 27,
      resizeMode: 'stretch',
    },
  },
};
