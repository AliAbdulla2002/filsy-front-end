import { useState } from "react"

import { signUp } from "../services/auth"

import { useNavigate } from "react-router"

const SignUpForm = function (props)
{
    const navigate = useNavigate()

    const initialState =
    {
        username: '',

        password: '',

        confirmPassword: '',
    }

    const [formData, setFormData] = useState(initialState)

    const [message, setMessage] = useState('')

    const handleChange = function (event)
    {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async function (event)
    {
        event.preventDefault()

        try
        {
            const newUser = await signUp(formData)

            props.setUser(newUser)

            setFormData(initialState)

            navigate('/')

        }
        catch (err)
        {
            setMessage(err.message)
        }
    }

    const isFormValid = function ()
    {
        if(formData.username && formData.password && formData.password === formData.confirmPassword)
        {
            return true

        }
        else return false
    }

    return (
        <main className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6">

                    <section className="card shadow-sm border-0 p-4">

                        <header>

                            <h1 className="text-center mb-4 fs-3 fw-bold">Sign Up</h1>

                            <p className="text-danger text-center fw-bold">{message}</p>

                        </header>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Username</label>
                                <input type="text" className="form-control" name="username" onChange={handleChange} value={formData.username} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Password</label>
                                <input type="password" className="form-control" name="password" onChange={handleChange} value={formData.password} required  minlength="6" />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">Confirm Password</label>
                                <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} required  minlength="6" />
                            </div>

                            <div className="d-flex gap-3">

                                <button type="submit" className="btn btn-primary w-100 fw-bold p-2" disabled={!isFormValid()}>Sign Up</button>

                                <button type="button" className="btn btn-outline-secondary w-100 fw-bold p-2" onClick={() => navigate('/')}>Cancel</button>

                            </div>

                        </form>

                    </section>

                </div>

            </div>

        </main>
    )
}

export default SignUpForm