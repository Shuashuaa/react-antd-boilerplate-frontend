import { Form, Input as FormInput } from "antd";
import React from "react";
import type { FormInputItem } from "./types";

interface Props {
    data?: FormInputItem
    noStyle?: boolean
}

const Input: React.FC<Props> = ({ data, noStyle }) => {
    return (
        <Form.Item
            key={data?.name}
            label={data?.label}
            name={data?.name}
            rules={data?.rules}
            noStyle={noStyle}
        >
            <FormInput
                name={`${data?.name}-input`}
                placeholder={data?.placeholder}
                prefix={data?.prefix}
                suffix={data?.suffix}
            />
        </Form.Item>
    )
}

export default Input;