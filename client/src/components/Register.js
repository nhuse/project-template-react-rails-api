import { useState } from "react"
import { useHistory } from "react-router-dom"
import './styles/RegisterLoginStyles.css'

export default function Register({ setUser }) {
    const history = useHistory()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        pass: '',
        confPass: ''
    })

    function handleChange(event) {
        setFormData({...formData, 
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        let data = {
            name: formData.name,
            email: formData.email,
            password: formData.pass,
            password_confirmation: formData.confPass
        }
        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.errors) {
                alert(json.errors)
            }
            else {
                setUser(json)
                history.push("/")
            }
        })
    }

    return (
        <div style={{ backgroundColor: "black", height: "95vh", position: "relative" }}> 
            <div className="login-signup-form-wrapper">
                <form className="login-signup-form" onSubmit={handleSubmit}>
                    <br/>
                    <label for="name" >Name:</label><br/>
                    <input type="text" name="name" className="input-field" id="name" value={formData.name} onChange={handleChange} /><br/><br/>
                    <label for="email">Email:</label><br/>
                    <input type="text" name="email" className="input-field" id="email" value={formData.email} onChange={handleChange} /><br/><br/>
                    <label for="password">Password:</label><br/>
                    <input type="password" name="pass" className="input-field" id="password" value={formData.pass} onChange={handleChange} /><br/><br/>
                    <label for="confPass">Confirm Password:</label><br/>
                    <input type="password" name="confPass" className="input-field" id="confPass" value={formData.confPass} onChange={handleChange} /><br/><br/>
                    <button type="submit" style={{ borderRadius: "30px" }} >Submit</button>
                </form>
            </div>
        </div>
    )
}