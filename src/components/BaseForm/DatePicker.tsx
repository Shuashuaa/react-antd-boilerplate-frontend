import { Form, DatePicker as FormDatePicker } from "antd";
import React from "react";
import type { FormInputItem } from "./types";

interface Props {
    data?: FormInputItem
    noStyle?: boolean
}

const DatePicker: React.FC<Props> = ({ data, noStyle }) => {
    return (
        <Form.Item
            key={data?.name}
            label={data?.label}
            name={data?.name}
            rules={data?.rules}
            noStyle={noStyle}
        >
            <FormDatePicker
                format={{
                    format: 'MM-DD-YYYY',
                    type: 'mask'
                }}
                allowClear
                width={'100%'}
                style={{ width: '100%' }}
            />
        </Form.Item>
    )
}

export default DatePicker;