import styles from "./SelectInput.module.css";
import { ClassAttributes, InputHTMLAttributes } from "react";
import { useField, FieldHookConfig, Field } from "formik";

type SelectFieldProps = {
	label: string;
	className?: string;
};

const SelectInput = ({
	label,
	className,
	...props
}: SelectFieldProps &
	InputHTMLAttributes<HTMLInputElement> &
	ClassAttributes<HTMLInputElement> &
	FieldHookConfig<string>) => {
	const [field, meta] = useField(props);
	const hasError = meta.touched && meta.error;

	return (
		<div className={`${className} ${styles["selectinput_wrapper"]}`}>
			<label
				className={styles["selectinput_wrapper__label"]}
				htmlFor={props.name || props.id}
			>
				{label}
			</label>
			<Field
				className={`${styles["selectinput_wrapper__input"]} ${
					hasError ? styles["selectinput_wrapper__input-error"] : ""
				}`}
				{...field}
				{...props}
			/>

			<div className={styles["selectinput_wrapper__error"]}>
				{hasError ? meta.error : ""}
			</div>
		</div>
	);
};

export default SelectInput;
