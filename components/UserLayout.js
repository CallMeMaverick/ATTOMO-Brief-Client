import Sidebar from "./Sidebar";

export default function UserLayout({ children }) {
    console.log("RENDERING!");
    return (
        <div className={"flex flex-row"}>
            <Sidebar />
            <div className={"m-5"}>
                {children}
            </div>
        </div>
    )
}