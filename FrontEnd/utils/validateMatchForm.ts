interface errors {
	[key: string]: any;
}

export default function validateMatchForm(
	values: any,
	possibleTeams: Array<string>,
	possibleStadiums: Array<string>
) {

	const errors: errors = {};
	if (!values.Team1) {
		errors.Team1 = "Requried";
	} else if (!(values.Team1 in possibleTeams)) {
		errors.Team1 = "Invalid Team Name";
	}

	if (!values.Team2) {
		errors.Team2 = "Requried";
	} else if (!(values.Team2 in possibleTeams)) {
		errors.Team2 = "Invalid Team Value";
	} else if (values.Team2 === values.Team1) {
		errors.Team2 = "Teams must be different";
	}
	if (!values.StadiumID) {
		errors.StadiumID = "Requried";
	} else if (!(values.StadiumID in possibleStadiums)) {
		console.log(values.StadiumID, possibleStadiums);
		errors.StadiumID = "Invalid Stadium Value";
	}

	if (!values.Referee) {
		errors.Referee = "Required";
	} else if (values.Referee.length < 4) {
		errors.Referee = "Must be at least 4 characters";
	}

	if (!values.Linesman1) {
		errors.Linesman1 = "Required";
	} else if (values.Linesman1.length < 4) {
		errors.Linesman1 = "Must be at least 4 characters";
	}

	if (!values.Linesman2) {
		errors.Linesman2 = "Required";
	} else if (values.Linesman2.length < 4) {
		errors.Linesman2 = "Must be at least 4 characters";
	}

	if (!values.Time) {
		errors.Time = "Required";
	}
	if (!values.Date) {
		errors.Date = "Required";
	}
	return errors;
}
