import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import StarRating from 'react-native-star-rating';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeReviewModal } from '../../../redux/actions/session';
import { submitReview } from '../../../redux/actions/user';

import Modal from '../../core/Modal';
import common from '../../../style/common';
import Input from '../../core/Input';
import Button from '../../core/Button';
import colors from '../../../constants/colors';
import styles from '../../../constants/styles';

class AddReview extends Component {
  static defaultProps = {
    visible: false,
  }

  static propTypes = {
    place: ImmutablePropTypes.map.isRequired,
    visible: PropTypes.bool,
    close: PropTypes.func.isRequired,
    submitReview: PropTypes.func.isRequired,
    actualPlaceId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      comment: undefined,
      rate: 0,
    };
  }

  onSubmit = () => {
    const data = {
      ...this.state,
      idPlace: this.props.actualPlaceId,
    };
    this.setState({
      rate: 0,
      comment: undefined,
    }, () => this.props.submitReview(data));
  }

  render() {
    const { place } = this.props;
    return (
      <Modal
        visible={this.props.visible}
        close={this.props.close}
      >
        <Text style={common.viewTitle}>
          ¿Como ha sido tu experiencia?
        </Text>
        <View>
          <Input
            title="Reseña"
            placeholder={`Describe tu experiencia con ${place.get('place')}`}
            onChange={(text) => this.setState({ comment: text })}
          />
          <View style={{ padding: 20 }}>
            <StarRating
              disabled={false}
              emptyStarColor={colors.regularLighterText}
              fullStarColor={colors.yellow}
              halfStarColor={colors.yellow}
              starSize={styles.sectionHeaderFontSize}
              halfStarEnabled
              maxStars={5}
              rating={this.state.rate}
              selectedStar={(rate) => this.setState({ rate })}
            />
          </View>
          <Button
            ownStyle="submit"
            text="Guardar Reseña"
            onPress={this.onSubmit}
          />
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  actualPlaceId: state.place.get('actualId'),
});

const mapDispatchToProps = {
  close: closeReviewModal,
  submitReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
