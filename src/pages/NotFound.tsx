// export default function NotFound() {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: '24px',
//         fontWeight: 'bold',
//         color: '#888',
//         flexDirection: 'column',
//       }}
//     >
//       <h1 style={{ margin: 0 }}>404</h1>
//       <p style={{ marginTop: '8px' }}>Page Not Found</p>
//       <a href="/" style={{ color: 'blue', fontSize: '15px', textDecorationColor: 'blue' }}>Back to Home</a>
//     </div>
//   );
// }

// import React from "react";
import BaseForm from '../components/BaseForm'
import type { FormInputItem } from "../components/BaseForm/types";

const formFields: FormInputItem[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "string",
    placeholder: "Enter your full name",
    rules: [{ required: true, message: "Please enter your name" }],
  },
  {
    name: "hobbies",
    label: "Hobbies",
    type: "checkbox-group",
    component: [
      { name: "reading", label: "Reading", type: "checkbox" },
      { name: "gaming", label: "Gaming", type: "checkbox" },
      { name: "traveling", label: "Traveling", type: "checkbox" },
    ],
    rules: [{ required: true, message: "Select at least one hobby" }],
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    placeholder: "Select your country",
    options: [
      { value: "ph", data: "Philippines" },
      { value: "us", data: "United States" },
      { value: "jp", data: "Japan" },
    ],
    rules: [{ required: true, message: "Please select your country" }],
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Insert description...",
    rules: [{ required: true, message: "Please select your country" }],
  }
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
          fullName: "Jovi Joshua",
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