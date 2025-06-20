import { Form, Button, Row, Popconfirm, Divider, Typography } from "antd";
import React from "react";
import Input from "./Input";
import ComponentWrapper from "./ComponentWrapper";
import InputNumber from "./InputNumber";
import Select from "./Select";
import Checkbox from "./Checkbox";
import DatePicker from "./DatePicker";
import Radio from "./Radio";
import FormTextArea from "./TextArea";
import TimePicker from "./TimePicker";
import AutoComplete from "./Autocomplete";
import ColorPicker from "./ColorPicker";
import BaseButton from "./Button";
import Upload from "./Upload";
import CheckboxGroup from "./CheckboxGroup";
import HiddenInput from "./HiddenInput";

import type { BaseFormProps, FormInputItem } from "./types";

const BaseForm = <T extends object>({
  externalData,
  formName,
  data,
  onFinish,
  onFinishFailed,
  onCancel,
  buttonConfig,
  disabledForm = false,
  loading = false,
  onValuesChange,
}: BaseFormProps<T>) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (externalData) {
      form.setFieldsValue(externalData);
    }
  }, [externalData, form]);

  const generateForm = (data?: FormInputItem[]) => {
    if (!data?.length) return null;

    return data.map((item, index) => {
      if (item.render && item.dependencies?.length) {
        return (
          <Form.Item
            key={item.name}
            noStyle
            shouldUpdate={(prevValues, currentValues) => {
              return item.dependencies!.some(
                (dep) => prevValues[dep] !== currentValues[dep]
              );
            }}
          >
            {({ getFieldsValue }) => {
              const values = getFieldsValue();
              const fieldsToRender = item.render!(values);
              return generateForm(fieldsToRender);
            }}
          </Form.Item>
        );
      }

      const renderWrapped = (Component: React.FC<any>) => (
        item.component?.length ? (
          <ComponentWrapper key={index} data={item}>
            <Component data={item} noStyle />
          </ComponentWrapper>
        ) : (
          <Component key={index} data={item} />
        )
      );

      switch (item.type) {
        case "string": return renderWrapped(Input);
        case "number": return renderWrapped(InputNumber);
        case "select": return renderWrapped(Select);
        case "checkbox": return renderWrapped((props) => <Checkbox {...props} isBaseForm />);
        case "checkbox-group": return <CheckboxGroup key={index} data={item} externalData={externalData} />;
        case "date": return renderWrapped(DatePicker);
        case "radio": return renderWrapped(Radio);
        case "textarea": return renderWrapped(FormTextArea);
        case "time": return renderWrapped(TimePicker);
        case "autocomplete": return renderWrapped(AutoComplete);
        case "color-picker": return renderWrapped(ColorPicker);
        case "button": return renderWrapped(BaseButton);
        case "upload": return renderWrapped(Upload);
        case "hidden": return renderWrapped(HiddenInput);
        case "section":
          return (
            <div style={{ width: "100%", marginTop: 32, marginBottom: 28 }}>
              <Divider orientation="start">
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {item.label}
                </Typography.Title>
              </Divider>
            </div>
          );
        default: return null;
      }
    });
  };

  return (
    <Form
      key="main-form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      form={form}
      name={`${formName}-form`}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      disabled={disabledForm}
      onValuesChange={onValuesChange}
    >
      {generateForm(data)}

      <Form.Item label colon={false}>
        <Row justify={"end"}>
          {formName && buttonConfig?.[formName]?.close && (
            <Popconfirm
              title="Cancel Operation"
              description="Are you sure to cancel this task?"
              onConfirm={onCancel}
            >
              <Button style={{ marginRight: 10 }} htmlType="button">
                {buttonConfig[formName].close}
              </Button>
            </Popconfirm>
          )}
          {formName && buttonConfig?.[formName]?.saveAndNew && (
            <Button
              style={{ marginRight: 10 }}
              loading={loading}
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    onFinish?.(values);
                    form.resetFields();
                  })
                  .catch(onFinishFailed);
              }}
            >
              {buttonConfig[formName].saveAndNew}
            </Button>
          )}
          {formName && buttonConfig?.[formName]?.submit && (
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10 }}
              danger={!!buttonConfig?.[formName]?.danger}
              loading={loading}
            >
              {buttonConfig[formName].submit}
            </Button>
          )}
        </Row>
      </Form.Item>
    </Form>
  );
};

export default BaseForm;