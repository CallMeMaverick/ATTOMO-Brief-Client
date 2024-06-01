import {useState} from "react";
import {useRouter} from "next/router";

export default function index() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

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

        const response = await fetch("https://attomo-brief-api-solitary-darkness-4773.fly.dev/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            setSuccessMessage("Successfully logged in");
            router.push(`/authorization/${data.user.id}/`)

        } else {
            let errorMessage;
            try {
                errorMessage = await response.json();
            } catch (error) {
                errorMessage = { message: 'Unknown error occurred' };
            }
            setErrorMessage(errorMessage.message || 'Failed log in.');
        }
    }

    return (
        <div className={"flex flex-col justify-center items-center mt-24"}>
            <form onSubmit={handleSubmit} className={"flex flex-col justify-center w-fit gap-3.5"}>
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

                <button className={"bg-emerald-500 text-white border border-emerald-500"} type={"submit"}>Log in
                </button>

                {errorMessage && <p className={"text-red-600"}>{errorMessage}</p>}
                {successMessage && <p className={"text-emerald-400"}>{successMessage}</p>}
            </form>
        </div>
    )
}