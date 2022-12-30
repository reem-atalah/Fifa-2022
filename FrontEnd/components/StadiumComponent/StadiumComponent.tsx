import { useSession } from "next-auth/react";
import React from "react";
import { reserveSeat,cancelReservation } from "../../data/matches/Reservation";
import SeatComponent from "../SeatComponent/SeatComponent";

const StadiumComponent = ({ stadium }: any) => {
	const { data: session } = useSession();
	const matchID = stadium.matchID
	const handleClick = async (seatNum: any, reservedState: any, setReservedState: any) => {
		if (reservedState == 0) {//seat is not reserved
			const success = await reserveSeat({ matchID,seatNum }, { Authorization: `Bearer ${session?.user?.token}` });
			if (success) setReservedState(1);
		} else if (reservedState == 1) {
			const success = await cancelReservation({ matchID,seatNum }, { Authorization: `Bearer ${session?.user?.token}` });
			if (success) setReservedState(0);
		}
	};
	
	const style = {
		gridTemplateColumns: `repeat(${20},minmax(max-content, 1fr))`,
	};
	return (
		<div className="p-2">
			<h1 className="text-center mb-2">
				Stadium:<span className="text-slate-700"> {stadium.Name}</span>
			</h1>
			<div className={`grid overflow-auto gap-1`} style={style}>
				{Array.from(
					Array(stadium.Number_Rows * stadium.NumSeatsPerRow),
					(_, index) => index + 1
				).map((seatNumber) => (
					<SeatComponent
						key={`${stadium.Name}-seat-${seatNumber}`}
						seatNum={seatNumber}
						reserved={
							stadium.userSeats.includes(seatNumber)? 1:
							stadium.reservedSeats.includes(seatNumber)? 2: 0
						}
						handleClick={handleClick}
					/>
				))}
			</div>
		</div>
	);
};

export default StadiumComponent;
