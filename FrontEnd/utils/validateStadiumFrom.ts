interface errors {
	[key: string]: any;
}

export default function validateStadiumForm(
	values: any,
	possibleStadiums: Array<Number>
) {
	const errors: errors = {};
	console.log(possibleStadiums);
	if (!values.Name) {
		errors.Name = "Requried";
	} else if (possibleStadiums.includes(values.Name)) {
		errors.Name = "Invalid Stadium Value";
	}
    if(values.NumRows < 1 || values.NumRows > 1000){
        errors.NumRows = "Invalid Number of Rows (1-1000)";
    }
    if(values.NumSeatsPerRow < 1 || values.NumSeatsPerRow > 1000){
        errors.NumSeatsPerRow = "Invalid Number of Seats Per Row (1-1000)";
    }

	return errors;
}
