import { Form, Button as FormButton } from "antd";
import React from "react";
import type { FormInputItem } from "./types";

interface Props {
    data?: FormInputItem
    noStyle?: boolean
}

const BaseButton: React.FC<Props> = ({ data, noStyle }) => {
    return (
        <Form.Item
            key={data?.name}
            label={" "}
            colon={false}
            name={data?.name}
            rules={data?.rules}
            noStyle={noStyle}
        >
            <FormButton icon={data?.prefix}>
                {data?.label}
            </FormButton>
        </Form.Item>
    )
}

export default BaseButton;