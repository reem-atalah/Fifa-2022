import Link from "next/link";
import React, { useState } from "react";
import AdminControlsComponent from "../AdminControlsComponent/AdminControlsComponent";
import styles from "./UserCard.module.css";
import { changeUserRole, deleteUser } from "../../data/users/UserMockApi";
import { Role } from "../../types";
import { useSession } from "next-auth/react";

const userRoles: any = {
	0: "Admin",
	1: "Manager",
	2: "Pending Manager",
	3: "Fan",
};

const UserCard = ({ user, showControls }: any) => {
	const { data: session } = useSession();

	const [deleted, setDeleted] = useState(false);
	const [role, setRole] = useState(user.Role || Role.Fan);

	const handelDeleteUser = async ({ Username }: any) => {
		const success = await deleteUser(
			{ Username },
			{ Authorization: `Bearer ${session?.user?.token}` }
		);
		if (success) setDeleted(true);
	};
	const handleChangeUserRule = async ({ Username, requestedRole }: any) => {
		const success = await changeUserRole(
			{ Username, requestedRole },
			{ Authorization: `Bearer ${session?.user?.token}` }
		);
		if (success) setRole(requestedRole);
	};

	return deleted ? null : (
		<div className={styles["user_card"]}>
			<Link
				href={`/users/${user.Username}`}
				className={styles["user_card__heading"]}
			>
				<p
					className={styles["user_card__heading-name"]}
				>{`${user.FirstName} ${user.LastName}`}</p>
				<p className={styles["user_card__heading-email"]}>{user.Email}</p>
			</Link>
			<p className={styles["user_card__role"]}>
				{role in userRoles ? userRoles[role] : "Fan"}
			</p>
			{showControls && (
				<AdminControlsComponent
					role={role}
					handelDeleteUser={() => handelDeleteUser({ Username: user.Username })}
					handleChangeUserRole={(requestedRole: any) =>
						handleChangeUserRule({ Username: user.Username, requestedRole })
					}
				/>
			)}
		</div>
	);
};

export default UserCard;
