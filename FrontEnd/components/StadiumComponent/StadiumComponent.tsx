import React from "react";
import SeatComponent from "../SeatComponent/SeatComponent";

const StadiumComponent = ({ stadium }: any) => {
	const style = {
		gridTemplateColumns: `repeat(${20},minmax(max-content, 1fr))`,
	};
	console.log(stadium);
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
							stadium.userSeats.includes(seatNumber) ||
							stadium.reservedSeats.includes(seatNumber)
						}
					/>
				))}
			</div>
		</div>
	);
};

export default StadiumComponent;
