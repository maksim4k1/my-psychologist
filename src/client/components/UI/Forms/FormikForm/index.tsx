"use client";

import { FileInput, Input, MaskedInput, Textarea } from "./components";
import styles from "./styles.module.scss";
import { Form, Formik, type FormikConfig, type FormikValues } from "formik";
import React, { type ReactNode } from "react";

interface Props<Values> extends FormikConfig<Values> {
  children: ReactNode;
  className?: string;
}

export const FormikForm = <Values extends FormikValues = FormikValues>({
  children,
  className = "",
  ...props
}: Props<Values>) => {
  return (
    <Formik<Values> {...props}>
      <Form
        className={`${styles.form} ${className}`}
        noValidate
      >
        {children}
      </Form>
    </Formik>
  );
};

FormikForm.Input = Input;
FormikForm.Textarea = Textarea;
FormikForm.MaskedInput = MaskedInput;
FormikForm.FileInput = FileInput;
