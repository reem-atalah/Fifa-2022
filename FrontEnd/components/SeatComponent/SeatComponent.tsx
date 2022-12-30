import { useSession } from "next-auth/react";
import React from "react";
import { cancelReservation, reserveSeat } from "../../data/matches/Reservation";

const SeatComponent = ({ seatNum, reserved, handleClick}: any) => {
	//reserver: 1 = user, 2 = other
	const [reservedState, setReservedState ] = React.useState(reserved);
	return (
		<button disabled={reservedState == 2} onClick={() => handleClick(seatNum, reservedState, setReservedState)}>
			<div className={`text-white text-center p-1 font-bold 
			${reservedState == 1 ? "bg-green-800" : reservedState == 2? "bg-red-800" : "bg-slate-400"}`}>
				{seatNum}
			</div>
		</button>
	);
};

export default SeatComponent;
