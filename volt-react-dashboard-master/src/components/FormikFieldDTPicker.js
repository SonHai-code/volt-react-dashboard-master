import React from "react";
import { Formik, Form, useField } from "formik";
import DatePicker from "react-datepicker";
import moment from "moment";

const FormikFieldDTPicker = ({ name = "" }) => {
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <DatePicker
      className="form-control"
      placeholderText="dd/mm/yyyy"
      {...field}
      selected={value}
      onChange={(date) => setValue(date)}
    />
  );
};

export default FormikFieldDTPicker;
