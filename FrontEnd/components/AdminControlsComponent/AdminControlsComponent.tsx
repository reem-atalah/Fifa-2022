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
	if (role === Role.manager) {
		message = "Make Fan";
		possibleRequestedRole = Role.fan;
	} else if (role === Role.pendingManager) {
		message = "Accept Request";
		possibleRequestedRole = Role.manager;
	} else if (role === Role.fan) {
		message = "Make Manager";
		possibleRequestedRole = Role.manager;
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
