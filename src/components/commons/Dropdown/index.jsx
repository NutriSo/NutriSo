import React from 'react';

import { Select } from 'antd';

const Dropdown = ({ data, placeholder, onChange, onSearch, defaultOption }) => {
    const { Option } = Select;

    return (
        <>
            {data?.length > 0 && (
                <Select
                    style={{ width: '100%' }}
                    defaultValue={defaultOption}
                    allowClear
                    placeholder={placeholder}
                    onSelect={onChange}
                    onSearch={onSearch}
                    showSearch={onSearch ? true : false}
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }>
                    {data.map((option) => (
                        <Option key={option.id ?? option._id} value={option.description ?? option.nombre} >
                            {option.description ?? option.nombre}
                        </Option>
                    ))}
                </Select>
            )
            }
        </>
    );
};

export default Dropdown;
