import { Link } from "react-router"

const ExpenseList = function (props) 
{
    if (props.expenses.length === 0)
    {
        return (
            <main className="card">
                <p>You haven't added any expenses yet!</p>
            </main>
        )
    }

    return (
        <main className="expense-list">

            {props.expenses.map((expense) => (
                
                <Link key={expense._id} to={`/expenses/${expense._id}`}>

                    <article className="card">

                        <header>

                            <span className="expense-badge">{expense.category}</span>

                            <h2>{expense.title}</h2> 

                        </header>

                        <p className="expense-text">Amount: {expense.amount.toLocaleString()} BD</p>

                        <footer className="expense-footer">

                            <span>

                                {new Date(expense.createdAt).toLocaleDateString()}

                            </span>

                        </footer>

                    </article>

                </Link>
            ))}

        </main>
    )
}

export default ExpenseList