import { Form, Checkbox as FormCheckbox } from "antd";
import React from "react";
import type { FormInputItem } from "./types";

interface Props {
	data?: FormInputItem;
	noStyle?: boolean;
	isBaseForm?: boolean; // prop for baseform, as to not affect basefilter checkbox style
}

const Checkbox: React.FC<Props> = ({ data, noStyle, isBaseForm = false }) => {
	return (
		<Form.Item
			key={data?.name}
			name={data?.name}
			rules={data?.rules}
			noStyle={noStyle}
			valuePropName="checked"
			wrapperCol={
				!noStyle && isBaseForm
					? {
							xs: { offset: 0, span: 24 },
							sm: { offset: 4, span: 24 },
							md: { offset: 4, span: 14 },
					  }
					: undefined
			}
		>
			<FormCheckbox>{data?.label}</FormCheckbox>
		</Form.Item>
	);
};

export default Checkbox;
