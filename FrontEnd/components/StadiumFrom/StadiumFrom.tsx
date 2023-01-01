import React, { useState } from "react";
import styles from "./StadiumForm.module.css";
import { Formik, Form } from "formik";
import TextInput from "../InputFields/TextInput/TextInput";
import SelectInput from "../InputFields/SelectInput/SelectInput";
import validateMatchForm from "../../utils/validateMatchForm";
import { createMatch, updateMatch } from "../../data/matches/MatchesMockApi";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import validateStadiumForm from "../../utils/validateStadiumFrom";
import { createStadium, updateStadium } from "../../data/stadiums/StadiumMockApi";

// type Props = {
// 	stadiums: any;
// 	createNew: Boolean;
// 	initialValues?: any;
// };

const StadiumForm = ({ stadiums, createNew, initialValues }: any) => {
	const { data: session, status } = useSession({ required: true });
	const router = useRouter();

	const handleSubmit = async (values: any, props: any) => {
		const headers = {
			Authorization: `Bearer ${session.user?.token}`,
		};
		if (createNew) {
			createStadium(values, headers)
				.then((res) => {
					router.push("/stadiums");
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			updateStadium({ID:initialValues.ID,...values}, headers)
				.then((res) => {
					router.push("/stadiums");
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	return (
		<Formik
			enableReinitialize
			initialValues={{
				Name: `${initialValues?.Name}`,
				NumRows: `${initialValues?.NumRows}`,
				NumSeatsPerRow: `${initialValues?.NumSeatsPerRow}`,
			}}
			onSubmit={handleSubmit}
			validate={(values) =>
				validateStadiumForm(values,stadiums.map((stadium: any) => stadium.Name))
			}
		>
			<Form className={styles["matches_form"]}>
				<TextInput label="Stadium Name" name="Name" type="text" />
				<TextInput label="Number of Rows" name="NumRows" type="number" />
				<TextInput label="Number of Seats per Row" name="NumSeatsPerRow" type="number" />

				<button type="submit" className="form--submit">
					Submit
				</button>
			</Form>
		</Formik>
	);
};

export default StadiumForm;
