import {useState} from "react";

export default function signupAdmin() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const response = await fetch("https://attomo-brief-api-solitary-darkness-4773.fly.dev/signup/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            setSuccessMessage("Admin successfully created");
        } else {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = { message: 'Unknown error occurred' };
            }
            setErrorMessage(errorData.message || 'Failed to create user.');
            console.error('Failed to create user:', errorData);
        }

    }

    return (
        <div className={"flex flex-col justify-center items-center mt-24"}>
            <form onSubmit={handleSubmit} className={"flex flex-col justify-center w-fit gap-3.5"}>
                <div className={"div-user"}>
                    <label className={"text-left"} htmlFor="name">Name</label>
                    <input
                        className={"w-64 border-emerald-500"}
                        type="text"
                        id={"name"}
                        name={"name"}
                        placeholder={"John"}
                        value={formData.name}
                        required={true}
                        onChange={handleChange}
                    />
                </div>

                <div className={"div-user"}>
                    <label htmlFor="surname">Surname</label>
                    <input
                        className={"w-64 border-emerald-500"}
                        type="text" id={"surname"}
                        name={"surname"}
                        placeholder={"Doe"}
                        value={formData.surname}
                        required={true}
                        onChange={handleChange}
                    />
                </div>

                <div className={"div-user"}>
                    <label htmlFor="email">Email</label>
                    <input
                        className={"w-64 border-emerald-500"}
                        type="email"
                        id={"email"}
                        name={"email"}
                        placeholder={"johndoe@mail.com"}
                        value={formData.email}
                        required={true}
                        onChange={handleChange}
                    />
                </div>

                <div className={"div-user"}>
                    <label htmlFor="password">Password</label>
                    <input
                        className={"w-64 border-emerald-500"}
                        type="password"
                        id={"password"}
                        name={"password"}
                        value={formData.password}
                        required={true}
                        onChange={handleChange}
                    />
                </div>

                <button className={"bg-emerald-500 text-white border border-emerald-500"} type={"submit"}>Register
                </button>

                {errorMessage && <p className={"text-red-600"}>{errorMessage}</p>}
                {successMessage && <p className={"text-emerald-400"}>{successMessage}</p>}
            </form>
        </div>
    )
}