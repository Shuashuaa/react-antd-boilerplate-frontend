import { Form, InputNumber as FormInputNumber } from "antd";
import React from "react";
import type { FormInputItem } from "./types";

interface Props {
    data?: FormInputItem
    noStyle?: boolean
}

const InputNumber: React.FC<Props> = ({ data, noStyle }) => {
    return (
        <Form.Item
            key={data?.name}
            label={data?.label}
            name={data?.name}
            rules={data?.rules}
            noStyle={noStyle}
        >
            <FormInputNumber<number>
                name={`${data?.name}-input`}
                placeholder={data?.placeholder}
                prefix={data?.prefix}
                suffix={data?.suffix}
                style={{ width: '100%' }}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
        </Form.Item>
    )
}

export default InputNumber;