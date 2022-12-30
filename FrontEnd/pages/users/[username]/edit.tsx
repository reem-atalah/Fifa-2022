import React from "react";
import MatchForm from "../../../components/MatchForm/MatchForm";
import { getSession, useSession } from "next-auth/react";
import { getAllTeams } from "../../../data/matches/TeamsApi";
import { getAllStadiums } from "../../../data/stadiums/StadiumMockApi";
import { Role } from "../../../types";
import Header from "../../../components/Header/Header";
import { Formik, Form, Field } from "formik";
import TextInput from "../../../components/InputFields/TextInput/TextInput";
import RadioInput from "../../../components/InputFields/RadioInput/RadioInput";
import styles from "../users.module.css";
import { editUserInfo } from "../../../data/users/UserMockApi";
import router from "next/router";
import validateEditInfo from "../../../utils/validateEditInfo";

const Edit = (props: any) => {
    const session = useSession(); 
    console.log(session);
    const handleSubmit = async (values: any) => {
        const { success, responseErr }: any = await editUserInfo(values,session?.data?.user?.token);
        if (success) {
            router.push(`/users/${values.username}`);
        } else {
            console.log(responseErr);
        }
    };
    return (
        <>
            <Header />
            <h1 className="text-2xl font-bold " >Edit User's Info</h1>
            <Formik
                initialValues={{
                    firstName: `${props.FirstName}`,
                    lastName: `${props.LastName}`,
                    username: `${props.Username }`,
                    email: `${props.Email}`,
                    password: ``,
                    confirmPassword: ``,
                    birthDate: ``,
                    gender: `${props.Gender}`,
                    nationality: `${props.Nationality}`,
                }}
                validate={validateEditInfo}
                onSubmit={handleSubmit}
            >
                <Form className="form">
                    <TextInput
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="Jane"
                        className={styles["text-input"]}
                    />
                    <TextInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Jane"
                        className={styles["text-input"]}
                    />
                    <TextInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Jane@gmail.com"
                    />
                    <TextInput
                        label="UserName"
                        name="username"
                        type="text"
                        placeholder="JaneAlex"
                    />
                    <TextInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="********"
                        className={styles["text-input"]}
                    />
                    <TextInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="********"
                        className={styles["text-input"]}
                    />
                    <TextInput
                        label="Birth Date"
                        name="birthDate"
                        type="date"
                        className={styles["text-input"]}
                    />
                    <TextInput
                        label="Nationality"
                        name="nationality"
                        type="text"
                        placeholder="Egyptian"
                        className={styles["text-input"]}
                    />
                    <div className="flex justify-start gap-8 w-screen">
                        <RadioInput
                            label="Female"
                            name="gender"
                            type="radio"
                            value="Female"
                        />
                        <RadioInput label="Male" name="gender" type="radio" value="Male" />
                    </div>
                    <button type="submit" className="form--submit">
                        Submit
                    </button>
                </Form>
            </Formik>
        </>
    );
};

export default Edit;

export async function getServerSideProps(context: any) {
    let x = context.query
    return { props: { ...x } };
}
