import React from 'react';
import classnames from 'classnames';
import { Spin, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { capitilizeWord } from '../../../utils';

import styles from './Loading.module.scss';

const Loading = ({ size, variant = 'default' }) => {
    const antIcon = <LoadingOutlined style={{ fontSize: size ?? 24 }} spin />;

    return (
        <Row className={classnames(styles.overrideSpinning, styles[`opacity${capitilizeWord(variant)}`])}>
            <Spin indicator={antIcon} />
        </Row>
    );
};

export default Loading;
