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
        <nav>
            <Link className="nav-brand" to="/"><img src= {logo} alt="filsy" /></Link>
            { props.user ? (
                <ul>
                    <li>Welcome, {props.user.username}!</li>

                    <li><Link to='/'>Dashboard</Link></li>

                    <li><Link to='/expenses'>Expenses</Link></li>

                    <li><Link to='/expenses/new'>New Expense</Link></li>

                    <li><Link to='/events'>Saving Goals</Link></li>

                    <li><Link to='/events/new'>New Goal</Link></li>

                    <li><Link to='/converter'>Converter</Link></li>

                    <li><Link to="/" onClick={handleSignOut}>Sign Out</Link></li>

                </ul>
            ) : (
            <ul>
                <li><Link to='/'>Home</Link></li>

                <li><Link to='/sign-up'>Sign Up</Link></li>

                <li><Link to='/sign-in'>Sign In</Link></li>
                
            </ul>
            ) }
        </nav>
    )
}

export default Nav