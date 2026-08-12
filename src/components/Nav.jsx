import { Link } from "react-router"
import logo from '../assets/logo.png'

const Nav = function (props)
{
    const handleSignOut = function ()
    {
        localStorage.removeItem('token')

        props.setUser(null)
    }

    return (
        <nav className="navbar navbar-light bg-white shadow-sm mb-4 px-3 px-md-4 d-flex justify-content-between align-items-center flex-wrap">
            <Link className="navbar-brand m-0" to="/"><img src={logo} alt="filsy" height= "80" /></Link>
            { props.user ? (
                <ul className="d-flex align-items-center gap-3 m-0 list-unstyled flex-wrap mt-3 mt-md-0">
                    <li className="fw-bold text-primary">Welcome, {props.user.username}!</li>

                    <li><Link className="text-decoration-none text-dark" to='/'>Dashboard</Link></li>

                    <li><Link className="text-decoration-none text-dark" to='/expenses'>Expenses</Link></li>

                    <li><Link className="text-decoration-none text-dark" to='/expenses/new'>New Expense</Link></li>

                    <li><Link className="text-decoration-none text-dark" to='/events'>Saving Goals</Link></li>

                    <li><Link className="text-decoration-none text-dark" to='/events/new'>New Goal</Link></li>

                    <li><Link className="text-decoration-none text-dark" to='/converter'>Converter</Link></li>

                    <li><Link className="btn btn-outline-danger btn-sm" to="/" onClick={handleSignOut}>Sign Out</Link></li>

                </ul>
            ) : (
            <ul className="d-flex align-items-center gap-3 m-0 list-unstyled flex-wrap mt-3 mt-md-0">
                <li><Link className="text-decoration-none text-dark" to='/'>Home</Link></li>

                <li><Link className="text-decoration-none text-dark" to='/sign-up'>Sign Up</Link></li>

                <li><Link className="btn btn-primary btn-sm px-3" to='/sign-in'>Sign In</Link></li>

            </ul>
            ) }
        </nav>
    )
}

export default Nav