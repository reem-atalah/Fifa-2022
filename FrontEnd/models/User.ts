import { Role, Gender } from "../types";
export default class User {
	private username: string;
	private firstName: string;
	private lastName: string;
	private birthDate: Date;
	private gender: Gender;
	private email: string;
	private role: Role;
	private password: string;
	private nationality?: string;

	constructor(
		username: string,
		firstName: string,
		lastName: string,
		birthDate: Date,
		gender: Gender,
		email: string,
		role: Role,
		password: string,
		nationality?: string
	) {
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthDate = birthDate;
		this.gender = gender;
		this.email = email;
		this.role = role;
		this.password = password;
		this.nationality = nationality;
	}

	public getFullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}
	public getUserName(): string {
		return this.username;
	}
	public getBirthDate(): Date {
		return this.birthDate;
	}
	public getGender(): Gender {
		return this.gender;
	}
	public getEmail(): string {
		return this.email;
	}
	public getRole(): Role {
		return this.role;
	}
	public getPassword(): string {
		return this.password;
	}
	public getNationality() {
		return this.nationality || "";
	}
}
