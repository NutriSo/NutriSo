import React from 'react';
import { Row, Col, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const HeaderTitle = ({ recipe, onEdit, onDelete }) => {
    const type = 'primary';
    const shape = 'circle';

    return (
        <Row>
            <Col span={18} style={{ padding: 5 }}>
                {recipe.titulo}
            </Col>
            <Col>
                <Button type={type} shape={shape} icon={<EditOutlined />} onClick={() => onEdit(recipe)} />
            </Col>
            <Col>
                <Button type={type} shape={shape} icon={<DeleteOutlined />} onClick={() => onDelete(recipe)} />
            </Col>
        </Row>
    );
};

export default HeaderTitle;
