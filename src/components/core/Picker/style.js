import colors from '../../../constants/colors';

export default {
  inputView: {
    flex: 1,
    padding: 5,
  },
  pickerModal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  field: {
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    height: 45,
    paddingHorizontal: 2,
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#ECECEC',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  picker: {
    borderTopColor: '#ccc',
  },
  pickerAndroid: {
    flex: 1,
  },
  fieldView: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 12,
    color: colors.regularLighterText,
  },
  pickerView: {
    height: 259,
    backgroundColor: '#D5D5D5',
    overflow: 'hidden',
  },
};
