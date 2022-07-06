import React from 'react';
import classNames from 'classnames';
import Slider from 'react-slick';

import styles from './Slider.module.scss';

const index = ({ config = {}, children, customClass }) => {
    return (
        <Slider {...config} className={classNames(styles.sliderContainer, customClass)}>
            {children}
        </Slider>
    );
};

export default index;
