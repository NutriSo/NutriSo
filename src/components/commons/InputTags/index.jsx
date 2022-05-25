import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { Input, Tag } from 'antd';

import { capitilizeWord, isEmptyString } from '../../../utils';

import styles from './InputTags.modules.scss';

const InputTags = ({ source, onUpdateOptions, onRemoveTag }) => {
    const inputRef = useRef();

    const handleAddTag = (e) => {
        e.preventDefault();

        const { value } = inputRef.current.input;

        if (isEmptyString(value)) return;

        const normalizedString = capitilizeWord(value.trim());

        onUpdateOptions((prevOptions) => [...prevOptions, normalizedString]);

        inputRef.current.input.value = '';
    };

    return (
        <div className={classnames(styles.tagContainer)}>
            <Input allowClear placeholder='Opciones de preparación' ref={inputRef} onPressEnter={handleAddTag} />
            {source?.map((option, index) => (
                <Tag key={index} color='#439776' closable onClose={() => onRemoveTag(option)}>
                    {option}
                </Tag>
            ))}
        </div>
    );
};

export default InputTags;
