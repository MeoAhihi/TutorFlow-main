import React from "react";
import { FloatingLabel, FormControl } from "react-bootstrap";

export default function FormField({ Icon, label, type, value, onChange }) {
  return (
    <div className="d-flex flex-row gap-3 align-items-center">
      {Icon && <Icon size={30} />}
      <FloatingLabel
        controlId={`signup-form-${label.replace(" ", "-")}`}
        label={label}
        className="flex-grow-1"
      >
        <FormControl
          name={label}
          value={value}
          onChange={onChange}
          type={type}
          // id={`signup-form-${label.replace(" ", "-")}`}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      </FloatingLabel>
    </div>
  );
}
