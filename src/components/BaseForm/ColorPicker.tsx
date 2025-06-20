import { Form, ColorPicker as FormColorPicker } from "antd";
import React from "react";
import type { FormInputItem } from "./types";

interface Props {
    data?: FormInputItem
    noStyle?: boolean
}

const ColorPicker: React.FC<Props> = ({ data, noStyle }) => {
    return (
        <Form.Item
            key={data?.name}
            label={data?.label}
            name={data?.name}
            rules={data?.rules}
            noStyle={noStyle}
        >
            <FormColorPicker />
        </Form.Item>
    )
}

export default ColorPicker;