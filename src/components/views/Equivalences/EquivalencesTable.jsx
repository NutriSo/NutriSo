import { memo } from 'react';

import { Table } from 'antd';

const EquivalencesTable = ({ columns, data }) => {
    return (
        <Table
            rowKey='id'
            sticky
            columns={columns}
            pagination={false}
            dataSource={data}
            scroll={{ x: 600 }}
            showSorterTooltip
            onRow={(record) => {
                return {
                    onClick: () => {
                        console.log(record);
                    },
                };
            }}
        />
    );
};

export default memo(EquivalencesTable);
