import React from "react";

const SeatComponent = ({ seatNum, reserved }: any) => {
	return (
		<div className={`text-white text-center p-1 font-bold ${reserved ? "bg-green-800" : "bg-slate-400"}`}>
			{seatNum}
		</div>
	);
};

export default SeatComponent;
