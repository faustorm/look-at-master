import colors from '../../../constants/colors';
import style from '../../../constants/styles';

export default {
  mainCardView: {
    height: 'auto',
    flexDirection: 'row',
  },
  bodyView: {
    flexDirection:'row',
    alignItems:'center',
    flex: 8,
    padding: 5,
    height: 65,
    backgroundColor: colors.white,
  },
  categoryImg: {
    width: style.subSectionHeader * 2,
    height: style.subSectionHeader * 2,
  },
  placeTitle: {
    fontWeight: style.subSectionHeaderFontWeight,
    color: colors.regularText,
    fontSize: style.subSectionHeader,
    marginTop: 5,
  },
  placeBranch: {
    color: colors.regularLighterText,
    height: 15,
    fontSize: style.subSectionBody,
    fontWeight: style.subSectionBodyFontWeight,
  },
};
