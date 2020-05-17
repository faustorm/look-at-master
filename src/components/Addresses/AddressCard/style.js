import colors from '../../../constants/colors';
import style from '../../../constants/styles';

export default {
  bodyView: {
    padding: 5,
    height: 65,
    backgroundColor: colors.white,
  },
  name: {
    fontWeight: style.subSectionHeaderFontWeight,
    color: colors.regularText,
    fontSize: style.subSectionHeader,
  },
  viewPadding: {
    paddingVertical: 2,
    paddingHorizontal: 1,
  },
  address: {
    color: colors.regularLighterText,
    fontSize: style.subSectionBody,
    fontWeight: style.subSectionBodyFontWeight,
  },
};
