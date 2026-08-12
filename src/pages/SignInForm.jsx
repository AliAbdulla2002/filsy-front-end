import { useNavigate } from "react-router"

import { useState } from "react"

import { signIn } from "../services/auth"

const SignInForm = function (props)
{
    const navigate = useNavigate()

    const initialState =
    {
        username: '',
        password: '',
    }
    const [formData, setFormData] = useState(initialState)

    const [message, setMessage] = useState('')

    const handleChange = function (event)
    {
        setMessage('')

        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async function (event)
    {
        event.preventDefault()

        try {

            const signedInUser = await signIn(formData)

            props.setUser(signedInUser)

            setFormData(initialState)

            navigate('/')

        }
        catch(err)
        {
            setMessage(err.message)
        }
    }

    return (
        <main className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6">

                    <section className="card shadow-sm border-0 p-4">

                        <header>

                            <h1 className="text-center mb-4 fs-3 fw-bold">Sign In</h1>

                            <p className="text-danger text-center fw-bold">{message}</p>

                        </header>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Username</label>
                                <input type="text" className="form-control" name="username" value={formData.username} required onChange={handleChange} />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">Password</label>
                                <input type="password" className="form-control" name="password" value={formData.password} required onChange={handleChange} />
                            </div>

                            <div className="d-flex gap-3">

                                <button type="submit" className="btn btn-primary w-100 fw-bold p-2">Sign In</button>

                                <button type="button" className="btn btn-outline-secondary w-100 fw-bold p-2" onClick={() => navigate('/')}>Cancel</button>

                            </div>

                        </form>

                    </section>

                </div>

            </div>

        </main>
    )
}

export default SignInForm