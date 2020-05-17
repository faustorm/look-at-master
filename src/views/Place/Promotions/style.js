import colors from '../../../constants/colors';
import styles from '../../../constants/styles';

export default {
  columnTouchable: {
    flexDirection: 'column',
    width: 280,
    height: 320,
  },
  rowContainer: {
    flex: 1,
    minHeight: 540,
    paddingVertical: 6,
    paddingHorizontal: 1,
  },
  thumb: {
    height: 190,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  share: {
    right: 3,
    top: 3,
    position: 'absolute',
  },
  thumbButtons: {
    right: 0,
    position: 'absolute',
  },
  bodyView: {
    padding: 10,
    height: 120,
    backgroundColor: colors.white,
  },
  columnContainer: {
    flexDirection: 'row',
    flex: 0,
    height: 350,
    backgroundColor: colors.regularBackground,
  },
  couponTitle: {
    marginVertical: 3,
    fontSize: styles.subSectionHeader,
    fontWeight: styles.subSectionHeaderFontWeight,
    color: colors.regularText,
  },
  expirationDate: {
    fontSize: styles.subSectionBody,
    fontWeight: styles.subSectionBodyFontWeight,
    color: colors.regularLighterText,
  },
};
