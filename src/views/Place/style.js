import colors from '../../constants/colors';
import style from '../../constants/styles';

export default {
  sectionBody: {
    color: colors.regularLighterText,
    fontSize: style.subSectionBody,
    fontWeight: style.subSectionBodyFontWeight,
    marginBottom: 7,
  },
  hourTitle: {
    color: colors.regularLighterText,
    fontSize: style.subSectionBody + 2,
    fontWeight: '200',
  },
  serviceTab: {
    flexDirection: 'row',
  },
  touchableService: {
    flex: 1,
    paddingRight: 1,
  },
  sectionTitle: {
    fontWeight: style.subSectionHeaderFontWeight,
    color: colors.regularText,
    fontSize: style.subSectionHeader,
  },
  callAction: {
    fontWeight: style.subSectionBodyFontWeight,
    color: colors.regularLighterText,
    fontSize: style.subSectionHeader,
  },
  map: {
    marginTop: 7,
    height: 200,
    flex: 1,
  },
  parentTextDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};
