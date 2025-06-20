import type { Rule } from "antd/es/form";
import type React from "react";

export type ButtonConfig<
  T extends string = string,
  V = { submit: string; saveAndNew?: string; close?: string; danger?: boolean }
> = {
  [key in T]?: V;
};
  
export interface FormInputItem {
  name: string;
  label?: string;
  type:
    | "string"
    | "number"
    | "radio"
    | "checkbox"
    | "checkbox-group"
    | "date"
    | "time"
    | "select"
    | "textarea"
    | "autocomplete"
    | "color-picker"
    | "button"
    | "upload"
    | "hidden"
    | "section";
  options?: Array<{ value: string | boolean; data: any }>;
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  rules?: Rule[];
  component?: Array<FormInputItem>;
  maxLength?: number;
  defaultValue?: string | boolean;
  min?: number;
  max?: number;
  dependencies?: string[];
  render?: (values: any) => FormInputItem[];
}

export interface BaseFormProps<T extends object> {
  externalData?: T;
  formName?: string;
  data?: FormInputItem[];
  onFinish?: (values: T) => void;
  onFinishFailed?: (errorInfo: any) => void;
  onCancel?: () => void;
  onFinishAndNew?: (values: T) => void;
  initialValues?: Partial<T>;
  buttonConfig?: ButtonConfig;
  disabledForm?: boolean;
  loading?: boolean;
  onValuesChange?: (changedValues: any, allValues: any) => void;
}