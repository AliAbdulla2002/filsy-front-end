import { Link } from 'react-router'
import logo from '../assets/logo.png'


const NavBar = ({ user, handleSignOut }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
            <div className="container">
                
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src="" alt= {logo} width="40" className="me-2" />
                    <span className="fw-bold">filsy</span>
                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center text-center">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-primary fw-bold me-lg-3">Welcome, {user.username || 'owner'}!</span>
                                </li>
                                <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/expenses">Expenses</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/expenses/new">New Expense</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/events">Saving Goals</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/events/new">New Goal</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/converter">Converter</Link></li>
                                
                                <li className="nav-item ms-lg-3 mt-2 mt-lg-0 mb-2 mb-lg-0">
                                    <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={handleSignOut}>
                                        Sign Out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/signin">Sign In</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
                            </>
                        )}
                    </ul>
                </div>
                
            </div>
        </nav>
    );
};

export default NavBar;