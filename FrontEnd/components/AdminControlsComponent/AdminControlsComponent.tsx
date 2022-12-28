import React from "react";
import styles from "./AdminControlsComponent.module.css";
import { Role } from "../../types";
import { FaTrash } from "react-icons/fa";
const AdminControlsComponent = ({
	role,
	handelDeleteUser,
	handleChangeUserRole,
}: any) => {
	let message = "";
	let possibleRequestedRole = role;
	if (role === Role.Manager) {
		message = "Make Fan";
		possibleRequestedRole = Role.Fan;
	} else if (role === Role.PendingManager) {
		message = "Accept Request";
		possibleRequestedRole = Role.Manager;
	} else if (role === Role.Fan) {
		message = "Make Manager";
		possibleRequestedRole = Role.Manager;
	}
	return (
		<div className={styles["control_components"]}>
			{message ? (
				<button
					className={styles["control_components--toggle"]}
					onClick={() => handleChangeUserRole(possibleRequestedRole)}
				>
					{message}
				</button>
			):<div className="grow"></div>}
			<button
				className={styles["control_components--delete"]}
				onClick={handelDeleteUser}
			>
				<FaTrash />
			</button>
		</div>
	);
};

export default AdminControlsComponent;
