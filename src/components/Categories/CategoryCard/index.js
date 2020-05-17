import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import CircleCard from '../../core/CircleCard';

const CategoryCard = (props) => (
  <CircleCard title={props.category.get('category')} img={props.category.get('icon')} onPress={() => props.onSelect(props.category.get('id'))} />
);

CategoryCard.propTypes = {
  category: ImmutablePropTypes.map.isRequired,
};

export default CategoryCard;
