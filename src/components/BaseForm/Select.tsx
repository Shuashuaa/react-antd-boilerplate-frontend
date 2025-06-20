import { Form, Select as FormSelect } from "antd";
import React from "react";
import type { FormInputItem } from "./types";

const { Option } = FormSelect;

interface Props {
    data?: FormInputItem
    noStyle?: boolean
}

const Select: React.FC<Props> = ({ data, noStyle }) => {
    if (!data?.options || !Array.isArray(data?.options)) {
        throw new Error("If select is used, 'options' should be a declared array.");
    }

    return (
        <Form.Item
            key={data.name}
            name={data.name}
            label={data.label}
            rules={data.rules}
            noStyle={noStyle}
        >
            <FormSelect
                key={`${data.name}-select`}
                placeholder={data.placeholder ?? "Select an option and change input text above"}
                defaultValue={data.defaultValue}
                allowClear
            >
                {data.options.map((option) => (
                    <Option key={option.data} value={option.value}>
                        {option.data}
                    </Option>
                ))}
            </FormSelect>
        </Form.Item>
    )
}

export default Select;