import React from "react";
import styles from "./MatchCard.module.css";
import { GiWhistle } from "react-icons/gi";
import { TbRectangleVertical } from "react-icons/tb";
import { MdPlace, MdEdit } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

const CardWrapper = ({ asLink, href, children, className }: any) => {
	const router = useRouter();
	return asLink ? (
		<button
			className={className}
			onClick={(e) => {
				router.push(href);
			}}
			style={{ cursor: "pointer" }}
		>
			{children}
		</button>
	) : (
		<div className={className}>{children}</div>
	);
};

const MatchCard = ({ match, asLink, showControl, className }: any) => {
	return (
		<CardWrapper
			asLink={asLink}
			className={`${className} ${styles["match-card"]}`}
			href={`matches/${match.ID}`}
		>
			{showControl && (
				<Link
					href={{ pathname: `matches/${match.ID}/edit`, query: { ...match } }}
					className={styles["edit-icon"]}
				>
					<MdEdit />
				</Link>
			)}
			<div className={styles["match-card__header"]}>
				<div className={styles["teams-wrapper"]}>
					<div className={styles["match-card__team"]}>
						<div className={styles["match-card__team-flag"]}></div>
						<p className={styles["match-card__team-name"]}>{match.Team1Name}</p>
					</div>
					vs
					<div className={styles["match-card__team"]}>
						<div className={styles["match-card__team-flag"]}></div>
						<p className={styles["match-card__team-name"]}>{match.Team2Name}</p>
					</div>
				</div>
				<p>at:</p>
				<div className={styles["date-time"]}>
					<p>{match.matchDate}</p>
					<p>{match.matchTime}</p>
				</div>
			</div>
			<div className={styles["match-card__content"]}>
				<div className={styles["match-card__content-item"]}>
					<div className={styles["content-item__header"]}>
						<MdPlace />
						<p>Stadium</p>
					</div>
					<p className={styles["content-item__content"]}>{match.Stadium}</p>
				</div>
				<div className={styles["match-card__content-item"]}>
					<div className={styles["content-item__header"]}>
						<GiWhistle />
						<p>Referee</p>
					</div>
					<p className={styles["content-item__content"]}>{match.Referee}</p>
				</div>
				<div className={styles["match-card__content-item"]}>
					<div className={styles["content-item__header"]}>
						<TbRectangleVertical />
						<p>Lineman 1</p>
					</div>
					<p className={styles["content-item__content"]}>{match.Linesman1}</p>
				</div>
				<div className={styles["match-card__content-item"]}>
					<div className={styles["content-item__header"]}>
						<TbRectangleVertical />
						<p>Lineman 2</p>
					</div>
					<p className={styles["content-item__content"]}>{match.Linesman2}</p>
				</div>
			</div>
		</CardWrapper>
	);
};

export default MatchCard;
