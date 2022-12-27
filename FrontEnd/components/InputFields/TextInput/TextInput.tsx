import styles from "./TextInput.module.css";
import { ClassAttributes, InputHTMLAttributes } from "react";
import { useField, FieldHookConfig } from "formik";

type TextFieldProp = {
	label: string;
	className?: string;
};

const TextInput = ({
	label,
	className,
	...props
}: TextFieldProp &
	InputHTMLAttributes<HTMLInputElement> &
	ClassAttributes<HTMLInputElement> &
	FieldHookConfig<string>) => {
	const [field, meta] = useField(props);
	const hasError = meta.touched && meta.error;

	return (
		<div className={`${className || ""} ${styles["textinput_wrapper"]}`}>
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

			<div className={styles["textinput_wrapper__error"]}>
				{hasError ? meta.error : ""}
			</div>
		</div>
	);
};

export default TextInput;
