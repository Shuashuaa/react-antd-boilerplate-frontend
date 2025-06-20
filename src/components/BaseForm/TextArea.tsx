import { Form, Input } from "antd";
import React from "react";
import type { FormInputItem } from "./types";

const { TextArea } = Input;

interface Props {
    data?: FormInputItem
    noStyle?: boolean
}

const FormTextArea: React.FC<Props> = ({ data, noStyle }) => {
    return (
        <Form.Item
            key={data?.name}
            label={data?.label}
            name={data?.name}
            rules={data?.rules}
            noStyle={noStyle}
        >
            <TextArea rows={4} maxLength={data?.maxLength} placeholder={data?.placeholder} />
        </Form.Item>
    )
}

export default FormTextArea;