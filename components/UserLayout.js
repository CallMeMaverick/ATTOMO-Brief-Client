export default function UserLayout({ children, header, sidebar }) {
    return (
        <div className="flex">
            {sidebar}
            <div className="flex flex-col flex-grow ml-64">
                {header}
                <div className="m-5">
                    {children}
                </div>
            </div>
        </div>
    )
}
