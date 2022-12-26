import { useState } from "react";
import { FiTrash } from "react-icons/fi";

export interface User {
    ID: number
    Username: string
    FirstName: string
    LastName: string
    Email: string
    BirthDate: string
    Gender: string
    Password: string
    Nationality: string
    Role: string
}
export default function AdminListElement(user: User) {
    const [flag, setFlag] = useState(1);
    const handleUpdateUser = async () => {
        setFlag(2);
        setStatus("Manager");
        try {
            const response = await fetch(`http://localhost:8080/users/${user.Username}`, {
                method: 'PUT',
                body: JSON.stringify({
                    "role": "1"
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();

            setData(result.res);
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${user.Username}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            setDeleted(true);
            console.log("tam")
        } catch (err) {
            console.log(err)
        }
    }

    const [data, setData] = useState(<button onClick={handleUpdateUser} className="bg-green-900 text-white border border-white p-1 text-sm">Make Manager</button>);

    const [status, setStatus] = useState(user.Role == "0" ? "Admin" : user.Role == "1" ? "Manager" : "Fan");

    const [deleted, setDeleted] = useState(false);

    const list = <div className="flex flex-row justify-between items-center border-2 border-red-500 px-10 mx-20">
        <p className=" text-lg text-red-700 w-1/3 ">{user.Username}</p>
        <div className="flex flex-row gap-12 justify-start w-1/3 ">
            <p> {status}</p>
            {flag && user.Role == "2" ? data : <></>}
        </div>
        <button onClick={handleDeleteUser} className="w-1/3 "><FiTrash className="ml-auto" /></button>
    </div>
    return (
        <>{!deleted && list}</>
    );
}