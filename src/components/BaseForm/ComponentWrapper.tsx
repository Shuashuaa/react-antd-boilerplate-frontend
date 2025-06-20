import { Row, Col, Form } from "antd";
import type { FormInputItem } from "./types";
import Input from "./Input";
import Select from "./Select";
import InputNumber from "./InputNumber";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import FormTextArea from "./TextArea";
import AutoComplete from "./Autocomplete";
import BaseButton from "./Button";
import Upload from "./Upload";
import HiddenInput from "./HiddenInput";

interface ComponentWrapperProps {
    children: React.ReactNode
    data: FormInputItem
}

const componentMap: Record<string, React.FC<any>> = {
    string: Input,
    number: InputNumber,
    radio: Radio,
    checkbox: Checkbox,
    date: DatePicker,
    time: TimePicker,
    select: Select,
    textarea: FormTextArea,
    autocomplete: AutoComplete,
    button: BaseButton,
    upload: Upload,
    hidden: HiddenInput
};

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({ data, children }) => {
    if (!data.component) throw new Error('Data Component is undefined.')

    return (
        <Form.Item key={data.name} label={data.label} >
            <Row>
                <Col flex={4} style={{ gap: 5 }}>
                    {children}
                </Col>

                {data.component.map((component) => {
                    const Component = componentMap[component.type];
                    return Component ? (
                        <Col key={component.name} flex={4} style={{ marginRight: 5, alignContent: 'center', marginBottom: 5 }}>
                            <Component data={component} noStyle />
                        </Col>
                    ) : null;
                })}
            </Row>
        </Form.Item>
    );
}

export default ComponentWrapper