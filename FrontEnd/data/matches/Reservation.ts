import axios from "axios";

export async function reserveSeat({matchID,seatNum}:any,headers: any) {
	console.log("---------------")
	console.log(headers)
	const seats = [seatNum]
	return axios
		.post(`http://localhost:8080/matches/${matchID}/seats`, {seats},{ headers })
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}

export async function cancelReservation({matchID,seatNum}:any,headers: any) {
	const seats = [seatNum]
	return axios
		.delete(`http://localhost:8080/matches/${matchID}/seats`,{
			data: {seats},
			headers
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}