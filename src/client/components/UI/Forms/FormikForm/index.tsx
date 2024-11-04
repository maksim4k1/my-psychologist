"use client";

import { Input } from "./components";
import styles from "./styles.module.scss";
import { Form, Formik, type FormikConfig, type FormikValues } from "formik";
import React, { type ReactNode } from "react";

interface Props<Values> extends FormikConfig<Values> {
  children: ReactNode;
  className?: string;
}

export const FormikForm = <Values extends FormikValues = FormikValues>({
  children,
  ...props
}: Props<Values>): React.JSX.Element => {
  return (
    <Formik<Values> {...props}>
      <Form className={`${styles.form} ${props.className ?? ""}`}>
        {children}
      </Form>
    </Formik>
  );
};

FormikForm.Input = Input;
