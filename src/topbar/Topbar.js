import "./Topbar.css";

export default function Topbar() {
    return (
        <div className="Topbar">
            <header>
                <img src="https://cdn.dribbble.com/users/565332/screenshots/3270378/media/11ce473b63029462a7148f33e3247d70.png" alt="website-logo"/>
                <h2>Bloggie</h2>
            </header>
            <nav>
                <ul>
                    <a href="#"><li>Home</li></a>
                    <a href="#"><li>About</li></a>
                    <a href="#"><li>Contact</li></a>
                </ul>
            </nav>
        </div>
    )
}