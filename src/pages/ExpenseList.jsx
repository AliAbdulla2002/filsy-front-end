import { Link } from "react-router"

const ExpenseList = function (props) 
{
  return (
    <main className="expense-list">

      {props.expenses.map((expense) => (
        
        <Link key={expense._id} to={`/expenses/${expense._id}`}>

            <article className="card">

                <header>

                    <span className="expense-badge">{expense.category}</span>

                    <h2>{expense.title}</h2> 

                </header>

                <p className="expense-text">Amount: {expense.amount} BD</p>

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