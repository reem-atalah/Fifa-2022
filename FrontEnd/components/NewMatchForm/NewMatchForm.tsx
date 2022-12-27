import React, { useState } from "react";
import styles from "./NewMatchForm.module.css";
import { Formik, Form } from "formik";
import TextInput from "../InputFields/TextInput/TextInput";
import SelectInput from "../InputFields/SelectInput/SelectInput";
import validateMatchForm from "../../utils/validateMatchForm";
import { createMatch } from "../../data/matches/MatchesMockApi";
import { useRouter } from "next/router";
const NewMatchForm = ({ teams, stadiums }: any) => {
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (values: any) => {
		createMatch(values)
			.then((res) => {
				console.log(res);
				router.push("/");
			})
			.catch((err) => {
				console.log(err);
				setError("Something went wrong");
			});
	};
	return (
		<Formik
			enableReinitialize
			initialValues={{
				StadiumID: "",
				Date: "",
				Time: "",
				Team1: "",
				Team2: "",
				Referee: "",
				Linesman1: "",
				Linesman2: "",
			}}
			onSubmit={handleSubmit}
			validate={(values) =>
				validateMatchForm(
					values,
					teams.map((team: any) => team.ID),
					stadiums.map((stadium: any) => stadium.ID)
				)
			}
		>
			<Form className={styles["matches_form"]}>
				<SelectInput label="Team 1" name="Team1" as="select">
					<option label="-- select an option --"></option>

					{teams.map((team: any) => (
						<option key={`team1-${team.ID}`} value={team.ID}>
							{team.Name}
						</option>
					))}
				</SelectInput>
				<SelectInput label="Team 2" name="Team2" as="select">
					<option label="-- select an option --"></option>
					{teams.map((team: any) => (
						<option key={`team2-${team.ID}`} value={team.ID}>
							{team.Name}
						</option>
					))}
				</SelectInput>
				<SelectInput label="Stadium" name="StadiumID" as="select">
					<option label="-- select an option --"></option>

					{stadiums.map((stadium: any) => (
						<option key={`team1-${stadium.ID}`} value={stadium.ID}>
							{stadium.Name}
						</option>
					))}
				</SelectInput>
				<TextInput label="Referee" name="Referee" type="text" />
				<TextInput label="Linesman 1" name="Linesman1" type="text" />
				<TextInput label="Linesman 2" name="Linesman2" type="text" />
				<TextInput
					label="Match Date"
					name="Date"
					type="date"
					className={styles["matches_form__small-field"]}
				/>
				<TextInput
					label="Match Time"
					name="Time"
					type="time"
					className={styles["matches_form__small-field"]}
				/>

				<button type="submit" className="form--submit">
					Submit
				</button>
			</Form>
		</Formik>
	);
};

export default NewMatchForm;
