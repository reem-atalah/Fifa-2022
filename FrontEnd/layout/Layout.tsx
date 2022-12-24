import React, { ReactNode } from "react";
import styles from "./Layout.module.css";

interface Props {
	children?: ReactNode;
}
const Layout = ({ children }: Props) => {
	return (
		<div className={styles["layout_wrapper"]}>
			<div className={styles["layout_wrapper__card"]}>
				<div className={styles["layout_wrapper__card-left"]}>
					<img
						className="max-h-full h-2/4"
						src="/logocup.png"
						alt="wolrd cup"
					/>
					<img src="/logoword.png" alt="world cup word" />
				</div>
				<div className={styles["layout_wrapper__card-right"]}>
					<div>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
