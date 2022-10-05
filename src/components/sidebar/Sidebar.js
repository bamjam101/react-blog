import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="Sidebar">
        <section class="side-bar">
            <header class="page-header">
                <h1>Skriible</h1>
            </header>
            <div class="img-list">
                <header>
                    <h3>Select</h3>
                </header>
            </div>
            <div class="theme">
                <header>
                    <h3>Choose Theme To Filter Blogs</h3>
                </header>
                <div className="list-wrapper">
                    <ul>
                        <li>Nature</li>
                        <li>Music</li>
                        <li>Political</li>
                        <li>Cinema</li>
                        <li>Webseries</li>
                        <li>Random</li>
                    </ul>
                </div>
            </div>
            <div className="contact-div">
                <i class="contact-icons fa-brands fa-instagram"></i>
                <i class="contact-icons fa-brands fa-linkedin"></i>
                <i class="contact-icons fa-brands fa-facebook-f"></i>
            </div>
        </section>
    </div>
  )
}
