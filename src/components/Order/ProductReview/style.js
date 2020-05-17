import colors from '../../../constants/colors';
import styles from '../../../constants/styles';

export default {
  productItem: {
    paddingLeft: 10,
    paddingRight: 3,
    backgroundColor: colors.regularBackground,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: colors.semiTransparent,
  },
  motherView: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 3,
  },
  productTitle: {
    fontSize: styles.subSectionBody,
    marginTop: 10,
    color: colors.regularText,
    fontWeight: styles.subSectionBodyFontWeight,
  },
  righted: {
    textAlign: 'right',
  },
  productQuantity: {
    fontSize: styles.subSectionBody,
    color: colors.regularLighterText,
  },
  productPrice: {
    fontSize: styles.subSectionBody,
    color: colors.regularLighterText,
    textAlign: 'right',
  },
};
