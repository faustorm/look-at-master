import colors from '../../../constants/colors';
import style from '../../../constants/styles';

const absouleView = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: 150,
};

export default {
  imageView: {
    height: 150,
    overflow: 'hidden',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 15,
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
  placeTitle: {
    fontWeight: style.subSectionHeaderFontWeight,
    color: colors.regularText,
    fontSize: style.subSectionHeader,
  },
  placeDescription: {
    color: colors.regularLighterText,
    fontSize: style.subSectionBody,
    fontWeight: style.subSectionBodyFontWeight,
  },
  favorite: {
    right: 5,
    top: 5,
    position: 'absolute',
  },
};
