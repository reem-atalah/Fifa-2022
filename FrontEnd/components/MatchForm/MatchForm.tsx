import React, { useState } from "react";
import styles from "./MatchForm.module.css";
import { Formik, Form } from "formik";
import TextInput from "../InputFields/TextInput/TextInput";
import SelectInput from "../InputFields/SelectInput/SelectInput";
import validateMatchForm from "../../utils/validateMatchForm";
import { createMatch, updateMatch } from "../../data/matches/MatchesMockApi";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type Props = {
	teams: any;
	stadiums: any;
	createNew: Boolean;
	initialValues?: any;
};

const MatchForm = ({ teams, stadiums, createNew, initialValues }: Props) => {
	const { data: session, status } = useSession({ required: true });
	const [error, setError] = useState("");
	const router = useRouter();
	if (status === "loading")
		return <div className="m-auto text-center">Loading ... </div>;

	const handleSubmit = async (values: any, props: any) => {
		const { Date: date, Time: time, ...params } = values;
		// console.log(params);
		console.log(session.user?.token);
		params.Time = new Date(`${date} ${time}:00`).toLocaleString("sv-SE");
		const headers = {
			Authorization: `Bearer ${session.user?.token}`,
		};
		if (createNew) {
			createMatch(params, headers)
				.then((res) => {
					router.push("/matches");
				})
				.catch((err) => {
					console.log(err);
					setError("Something went wrong");
				});
		} else {
			updateMatch(params, headers)
				.then((res) => {
					router.push("/matches");
				})
				.catch((err) => {
					console.log(err);
					setError("Something went wrong");
				});
			// }
		}
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
				...(initialValues || {}),
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
						<option key={`stadium-${stadium.ID}`} value={stadium.ID}>
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

export default MatchForm;
