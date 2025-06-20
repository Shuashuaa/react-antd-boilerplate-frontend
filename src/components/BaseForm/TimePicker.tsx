import { Form, TimePicker as FormTimePicker } from "antd";
import React from "react";
import type { FormInputItem } from "./types";

interface Props {
    data?: FormInputItem
    noStyle?: boolean
}

const TimePicker: React.FC<Props> = ({ data, noStyle }) => {
    return (
        <Form.Item
            key={data?.name}
            label={data?.label}
            name={data?.name}
            rules={data?.rules}
            noStyle={noStyle}
        >
            <FormTimePicker
                allowClear
                width={'100%'}
                style={{ width: '100%' }}
                placeholder={data?.placeholder}
            />
        </Form.Item>
    )
}

export default TimePicker;