import BaseForm from '../components/BaseForm'
import type { FormInputItem } from "../components/BaseForm/types";

const formFields: FormInputItem[] = [
  {
    name: "accountType",
    label: "Account Type",
    type: "radio",
    options: [
      { value: "personal", data: "Personal" },
      { value: "business", data: "Business" },
      { value: "admin", data: "Admin" },
    ],
    rules: [{ required: true, message: "Please select an account type" }],
  },
  {
    name: "accountDetails",
    type: "section",
    label: "Account Details",
    dependencies: ["accountType"],
    render: (values) => {
      const { accountType } = values;
      if (!accountType) return [];

      const common: FormInputItem[] = [
        {
          name: "fullName",
          label: "Full Name",
          type: "string",
          placeholder: "Enter your full name",
          rules: [{ required: true, message: "Please enter your name" }],
        },
      ];

      if (accountType === "personal") {
        return [
          ...common,
          {
            name: "dob",
            label: "Date of Birth",
            type: "date",
            rules: [{ required: true, message: "Enter your birthdate" }],
          },
          {
            name: "gender",
            label: "Gender",
            type: "radio",
            options: [
              { value: "male", data: "Male" },
              { value: "female", data: "Female" },
              { value: "other", data: "Other" },
            ],
          },
        ];
      }

      if (accountType === "business") {
        return [
          ...common,
          {
            name: "companyName",
            label: "Company Name",
            type: "string",
            rules: [{ required: true, message: "Enter your company name" }],
          },
          {
            name: "businessEmail",
            label: "Business Email",
            type: "string",
            placeholder: "Enter business email",
            rules: [{ required: true, message: "Enter a business email" }],
          },
          {
            name: "taxId",
            label: "Tax ID",
            type: "string",
            rules: [{ required: true, message: "Enter tax ID" }],
          },
        ];
      }

      if (accountType === "admin") {
        return [
          ...common,
          {
            name: "adminCode",
            label: "Admin Code",
            type: "string",
            rules: [{ required: true, message: "Enter admin code" }],
          },
          {
            name: "accessLevel",
            label: "Access Level",
            type: "select",
            options: [
              { value: "super", data: "Super Admin" },
              { value: "moderator", data: "Moderator" },
            ],
            rules: [{ required: true, message: "Select access level" }],
          }
        ];
      }

      return [];
    },
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Insert description...",
    rules: [{ required: true, message: "Please enter a description" }],
  },
];


const FormDemo = () => {
  const handleSubmit = (values: any) => {
    console.log("✅ Submitted:", values);
  };

  const handleFailed = (error: any) => {
    console.log("❌ Failed:", error);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>🧪 Dynamic Base Form Demo</h2>
      <BaseForm
        formName="demoForm"
        data={formFields}
        onFinish={handleSubmit}
        onFinishFailed={handleFailed}
        externalData={{
          fullName: "Juan Dela Cruz",
          country: "ph",
          description: "",
          hobbies: ["gaming", "reading"],
        }}
        buttonConfig={{
          demoForm: {
            submit: "Submit Form",
            close: "Cancel",
            saveAndNew: "Save and Add Another",
          },
        }}
      />
    </div>
  );
};

export default FormDemo;  