import React from "react";
import { ClassAttributes, InputHTMLAttributes } from "react";
import styles from "./RadioInput.module.css";
import { useField, FieldHookConfig } from "formik";
type TextFieldProp = {
	label: string;
};
const RadioInput = ({
	label,
	...props
}: TextFieldProp &
	InputHTMLAttributes<HTMLInputElement> &
	ClassAttributes<HTMLInputElement> &
	FieldHookConfig<string>) => {
	const [field] = useField(props);
	return (
		<div className={styles["input-wrapper"]}>
			<input className={styles["input-wrapper__input"]} {...field} {...props} />
			<label
				className={styles["input-wrapper__label"]}
				htmlFor={props.id || props.name}
			>
				{label}
			</label>
		</div>
	);
};

export default RadioInput;
