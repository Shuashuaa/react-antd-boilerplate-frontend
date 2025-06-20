import { Form, Checkbox, Typography } from "antd";
import type { FormInputItem } from "./types";

// Checkbox Group for inputs that need multiple checkboxes like delivery options on Product
const CheckboxGroup = ({
	data,
	noStyle,
	externalData,
}: {
	data: FormInputItem;
	noStyle?: boolean;
	externalData: any;
}) => {
	const options =
		data.component?.map((option) => ({
			label: option.label,
			value: option.name,
		})) ?? [];

	const checkedValues = externalData ? externalData[data.name] : [];

	return (
		<Form.Item
			label={
				data.label ? (
					<Typography.Text>{data.label}:</Typography.Text>
				) : undefined
			}
			colon={false}
			style={noStyle ? { margin: 0 } : {}}
		>
			<Form.Item name={data.name} rules={data.rules} noStyle>
				<Checkbox.Group options={options} value={checkedValues} />
			</Form.Item>
		</Form.Item>
	);
};

export default CheckboxGroup;
