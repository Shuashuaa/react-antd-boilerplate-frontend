import { Form, AutoComplete as FormAutocomplete } from "antd";
import React from "react";
import type { FormInputItem } from "./types";

interface Props {
    data?: FormInputItem
    noStyle?: boolean
}

const AutoComplete: React.FC<Props> = ({ data, noStyle }) => {
    return (
        <Form.Item
            key={data?.name}
            label={data?.label}
            name={data?.name}
            rules={data?.rules}
            noStyle={noStyle}
        >
            <FormAutocomplete
                prefix={data?.prefix}
                variant='outlined'
                placeholder={data?.placeholder}
                allowClear
            />
        </Form.Item>
    )
}

export default AutoComplete;