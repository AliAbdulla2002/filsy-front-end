import { Link, NavLink } from "react-router"
import logo from '../assets/logo.png'

const Nav = function (props)
{
    const handleSignOut = function ()
    {
        localStorage.removeItem('token')
        props.setUser(null)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4 px-3 px-md-4">
            <div className="container-fluid">
                
                <Link className="navbar-brand m-0 d-flex align-items-center" to="/">
                    <img src={logo} alt="filsy" height="80" />
                </Link>

                <button 
                    className="navbar-toggler border-0" 
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
                    {props.user ? (
                        <ul className="navbar-nav ms-auto align-items-center gap-3 text-center mt-3 mt-lg-0">
                            <li className="nav-item fw-bold text-primary mb-2 mb-lg-0">
                                Welcome, {props.user.username}!
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fw-semibold" to='/' end>Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fw-semibold" to='/expenses'>Expenses</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fw-semibold" to='/expenses/new'>New Expense</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fw-semibold" to='/events'>Saving Goals</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fw-semibold" to='/events/new'>New Goal</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fw-semibold" to='/converter'>Converter</NavLink>
                            </li>
                            <li className="nav-item mt-2 mt-lg-0">
                                <Link className="btn btn-outline-danger btn-sm px-4" to="/" onClick={handleSignOut}>
                                    Sign Out
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav ms-auto align-items-center gap-3 text-center mt-3 mt-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link fw-semibold" to='/' end>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fw-semibold" to='/sign-up'>Sign Up</NavLink>
                            </li>
                            <li className="nav-item mt-2 mt-lg-0">
                                <Link className="btn btn-primary btn-sm px-4" to='/sign-in'>
                                    Sign In
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
                
            </div>
        </nav>
    )
}

export default Nav