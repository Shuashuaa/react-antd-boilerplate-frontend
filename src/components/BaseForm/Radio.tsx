import { Form, Radio as FormRadio } from "antd";
import React from "react";
import type { FormInputItem } from "./types";

interface Props {
	data?: FormInputItem;
	noStyle?: boolean;
}

const Radio: React.FC<Props> = ({ data, noStyle }) => {
	if (!data?.options || !Array.isArray(data?.options)) {
		throw new Error(
			"If select is used, 'options' should be a declared array."
		);
	}

	return (
		<Form.Item
			key={data.name}
			name={data.name}
			label={data.label}
			rules={data.rules}
			initialValue={
				data.defaultValue !== undefined
					? data.defaultValue
					: data.options[0].value
			}
			noStyle={noStyle}
		>
			<FormRadio.Group buttonStyle="solid">
				{data.options.map((option) => {
					return (
						<FormRadio.Button
							key={option.data}
							value={option.value}
						>
							{option.data}
						</FormRadio.Button>
					);
				})}
			</FormRadio.Group>
		</Form.Item>
	);
};

export default Radio;
