import colors from '../../../constants/colors';

export default {
  tabs: {
    padding: 0,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  tab: {
    flex: 1,
    backgroundColor: colors.transparent,
  },
  tabText: {
    fontSize: 13,
    textAlign: 'center',
    color: colors.regularText,
  },
  activeTab: {
    height: 2,
    width: 70,
    marginTop: 5,
    backgroundColor: colors.brand,
    alignSelf: 'center',
  },
};
