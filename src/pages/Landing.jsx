import { Link } from "react-router"

const Landing = function ()
{
    return (
        <main className="container mt-5">
            
            <div className="text-center mb-5 p-5 bg-white shadow-sm rounded-4 border-0">
                <h1 className="display-4 fw-bold text-primary mb-3">Welcome to Filsy!</h1>
                
                <p className="lead text-muted mb-4">Your personal finance companion. Track your expenses, set saving goals, and manage your money smartly.</p>
                
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Link to="/sign-up" className="btn btn-primary btn-lg px-4 fw-bold">Get Started</Link>
                    
                    <Link to="/sign-in" className="btn btn-outline-primary btn-lg px-4 fw-bold">Sign In</Link>
                </div>
            </div>

            <div className="row g-4 text-center">
                
                <div className="col-12 col-md-4">
                    <div className="card h-100 shadow-sm border-0 p-4">
                        <h3 className="h5 fw-bold text-dark mb-3">Track Expenses</h3>
                        <p className="text-muted m-0">Log your daily spending and know exactly where your money goes.</p>
                    </div>
                </div>
                
                <div className="col-12 col-md-4">
                    <div className="card h-100 shadow-sm border-0 p-4">
                        <h3 className="h5 fw-bold text-dark mb-3">Saving Goals</h3>
                        <p className="text-muted m-0">Set targets for things you want to buy and track your progress easily.</p>
                    </div>
                </div>
                
                <div className="col-12 col-md-4">
                    <div className="card h-100 shadow-sm border-0 p-4">
                        <h3 className="h5 fw-bold text-dark mb-3">Live Converter</h3>
                        <p className="text-muted m-0">Check live exchange rates and convert your BHD to other currencies.</p>
                    </div>
                </div>
                
            </div>

        </main>
    )
}

export default Landing