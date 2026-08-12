import { Link } from "react-router"

const ExpenseList = function (props)
{
    if (props.expenses.length === 0)
    {
        return (
            <main className="container mt-5">
                
                <div className="card shadow-sm border-0 text-center p-5">
                    <p className="fs-5 text-muted m-0">You haven't added any expenses yet!</p>
                </div>

            </main>
        )
    }

    return (
        <main className="container mt-4 mb-5">

            <div className="row g-4">

                {props.expenses.map((expense) => (

                    <div key={expense._id} className="col-12 col-md-6 col-lg-4">
                        
                        <Link to={`/expenses/${expense._id}`} className="text-decoration-none">

                            <article className="card h-100 shadow-sm border-0 p-4">

                                <header className="mb-3">

                                    <span className="badge bg-light text-secondary border mb-3 px-2 py-1">{expense.category}</span>

                                    <h2 className="fs-5 fw-bold text-dark m-0">{expense.title}</h2>

                                </header>

                                <p className="fs-4 fw-bold text-primary mb-4">{expense.amount.toLocaleString()} BD</p>

                                <footer className="mt-auto border-top pt-3">

                                    <span className="text-muted small">
                                        {new Date(expense.createdAt).toLocaleDateString()}
                                    </span>

                                </footer>

                            </article>

                        </Link>

                    </div>

                ))}

            </div>

        </main>
    )
}

export default ExpenseList