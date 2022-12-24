import styles from "./TextInput.module.css";
import { ClassAttributes, InputHTMLAttributes } from "react";
import { useField, FieldHookConfig } from "formik";

type TextFieldProp = {
	label: string;
};

const TextInput = ({
	label,
	...props
}: TextFieldProp &
	InputHTMLAttributes<HTMLInputElement> &
	ClassAttributes<HTMLInputElement> &
	FieldHookConfig<string>) => {
	const [field, meta] = useField(props);
	const hasError = meta.touched && meta.error;

	return (
		<div className={styles["textinput_wrapper"]}>
			<label
				className={styles["textinput_wrapper__label"]}
				htmlFor={props.id || props.name}
			>
				{label}
			</label>
			<input
				className={`${styles["textinput_wrapper__input"]} ${
					hasError ? styles["textinput_wrapper__input-error"] : ""
				}`}
				{...field}
				{...props}
			/>
			{hasError ? (
				<div className={styles["textinput_wrapper__error"]}>{meta.error}</div>
			) : null}
		</div>
	);
};

export default TextInput;
