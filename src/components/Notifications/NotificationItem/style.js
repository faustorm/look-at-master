import colors from '../../../constants/colors';
import style from '../../../constants/styles';

const absouleView = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: 120,
};

export default {
  imageView: {
    height: 120,
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 25,
  },
  bodyView: {
    padding: 5,
    height: 65,
    backgroundColor: colors.white,
  },
  image: absouleView,
  imageOverlay: {
    ...absouleView,
    zIndex: 1,
    backgroundColor: colors.cardTransparentOverlay,
  },
  place: {
    fontWeight: style.subSectionHeaderFontWeight,
    color: colors.regularText,
    fontSize: style.subSectionHeader,
  },
  notification: {
    color: colors.regularLighterText,
    fontSize: style.subSectionBody,
    fontWeight: style.subSectionBodyFontWeight,
  },
};
