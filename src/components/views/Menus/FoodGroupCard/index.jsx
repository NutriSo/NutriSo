import React from 'react';
import classNames from 'classnames';

import { backgroundColors } from './constants/backgroundColors';
import '../Menus.scss';

const FoodGroupCard = ({ category, onSelectCategory, isSelected }) => {
    return (
        <section
            onClick={() => onSelectCategory(category)}
            className={classNames('foodGroupCardContainer', {
                ['active']: isSelected,
            })}
            style={{
                backgroundColor: backgroundColors[category],
            }}>
            <h3>{category}</h3>
        </section>
    );
};

export default FoodGroupCard;
