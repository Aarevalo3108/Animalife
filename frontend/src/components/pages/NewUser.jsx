import url from "../../utils/urls"
import regex from "../../utils/regex"
import Loading from "../Loading"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

/*

data to send:
{
	"name": string,
	"lastName": string,
	"phone": string,
	"email": string,
	"password": string,
}

*/

const NewUser = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const goTo = useNavigate()

  const reset = () => {
    setName("")
    setLastName("")
    setPhone("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setError(null)
  }

  const handleSubmit = async (e) => {
    window.scrollTo(0, 0)
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (!regex.name.test(name)) {
      setError("Name is not valid")
      return
    }
    if (!regex.lastName.test(lastName)) {
      setError("Last name is not valid")
      return
    }
    if (!regex.email.test(email)) {
      setError("Email is not valid")
      return
    }
    if (!regex.password.test(password)) {
      setError("Password is not valid. Must have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.")
      return
    }
    if (!regex.description.test(phone)) {
      setError("Phone is not valid")
      return
    }

    try {
      setLoading(true)
      const response = await axios.post(url.backend + "/users", {
        name,
        lastName,
        phone,
        email,
        password
      })
      console.log(response.data)
      if (response.status === 201) {
        setError(null)
        reset()
        window.scrollTo(0, 0)
        goTo("/admin/user/img/" + response.data.docs[0]._id)
      }
      setLoading(false)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center min-h-[85vh] gap-4 py-8" >
      <h1 className="text-3xl">New User</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid gap-4">
        {loading ? <Loading /> : <form className="grid gap-4" method="POST" onSubmit={handleSubmit}>
          <label className="grid gap-2" htmlFor="name">
            <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500">Name:</span>
            <input className={"w-full p-2 rounded-lg"} type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
          </label>
          <label className="grid gap-2" htmlFor="lastName">
            <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500">Last Name:</span>
            <input className={"w-full p-2 rounded-lg"} type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </label>
          <label className="grid gap-2" htmlFor="phone">
            <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500">Phone:</span>
            <input className={"w-full p-2 rounded-lg"} type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          <label className="grid gap-2" htmlFor="email">
            <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500">Email:</span>
            <input className={"w-full p-2 rounded-lg"} type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="grid gap-2" htmlFor="password">
            <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500">Password:</span>
            <input className={"w-full p-2 rounded-lg"} type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <label className="grid gap-2" htmlFor="confirmPassword">
            <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500">Confirm Password:</span>
            <input className={"w-full p-2 rounded-lg"} type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </label>
          <label className="grid grid-cols-3 gap-2" htmlFor="submit">
            <Link className={"w-full transition duration-150 p-2 rounded-lg text-n5 bg-n2 hover:bg-n1"} to="/admin/users">Cancel</Link>
            <input className={"w-full cursor-pointer transition duration-150 p-2 rounded-lg text-n1 bg-n5 hover:bg-n1 hover:text-n5"} type="reset" value="Reset" />
            <input className={"w-full cursor-pointer transition duration-150 p-2 rounded-lg text-n5 bg-n4 hover:bg-n1"} type="submit" value="Submit" />
          </label>
        </form>}
      </div>
    </div>
  )
}

export default NewUser