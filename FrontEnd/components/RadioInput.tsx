import React from "react";
import { ClassAttributes, InputHTMLAttributes } from "react";

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
		<div>
			<input className="radio-input" {...field} {...props} />
			<label htmlFor={props.id || props.name}>{label}</label>
		</div>
	);
};

export default RadioInput;
