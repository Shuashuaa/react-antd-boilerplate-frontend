import { Form, Input as FormInput } from "antd";
import React from "react";
import type { FormInputItem } from "./types";

interface Props {
    data?: FormInputItem
    noStyle?: boolean
}

// For flexibilty in forms/filters, hide the main input and only show the inputs in the component props
// can be used to group inputs
const HiddenInput: React.FC<Props> = ({ data, noStyle }) => {
    return (
        <Form.Item
            key={data?.name}
            label={data?.label}
            name={data?.name}
            rules={data?.rules}
            noStyle={noStyle}
            hidden={true} // hidden by default and only show the label
        >
            <FormInput
                name={`${data?.name}-input`}
                placeholder={data?.placeholder}
                prefix={data?.prefix}
                suffix={data?.suffix}
                hidden={true}
            />
        </Form.Item>
    )
}

export default HiddenInput;