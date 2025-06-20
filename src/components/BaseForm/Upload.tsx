import { Form, Button as FormButton, Upload as FormUpload } from "antd";
import React from "react";
import type { FormInputItem } from "./types";

interface Props {
    data?: FormInputItem
    noStyle?: boolean
}

const Upload: React.FC<Props> = ({ data, noStyle }) => {
    return (
        <Form.Item
            key={data?.name}
            label={" "}
            colon={false}
            name={data?.name}
            rules={data?.rules}
            noStyle={noStyle}
        >
            <FormUpload>
                <FormButton icon={data?.prefix}>
                    {data?.label}
                </FormButton>
            </FormUpload>
        </Form.Item>
    )
}

export default Upload;