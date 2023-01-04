import './Auth.css'
import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';


export default function Auth (props) {
    
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [psw, setPsw] = useState('')
    const [wrongPassword, setWrongPassword] = useState(false)

    async function login(e){

        e.preventDefault()

        const pb = new PocketBase('http://127.0.0.1:8090')

        const authData = await pb.collection('users').authWithPassword(email, psw)
            .then(() => {
                if(pb.authStore.isValid){
                    console.log(pb.authStore.model)
                    props.setisLoggedIn(true);
                    props.setUser({name: pb.authStore.model.username})
                    navigate("/home")
                }
            }).catch((error) => {
                console.log(error)
                setWrongPassword(true)
            });
    }

    return (
        <div className="Auth-form-container">
        <form className="Auth-form">
            <div className="Auth-form-content">
            <h3 className="Auth-form-title">Vitrobility 1.0</h3>
            <div className="form-group mt-3">
                <label>Email</label>
                <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                onChange={event => setEmail(event.target.value)}
                />
            </div>
            <div className="form-group mt-3">
                <label>Password</label>
                <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                onChange={event => setPsw(event.target.value)}
                />
            </div>

            {wrongPassword &&
                <div className="form-group mt-3">
                    <span>
                        Hai sbagliato la mail o la password, chi cazzo sei?
                    </span>
                </div>
            }

                

            <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" onClick={e => login(e)}>
                    Accedi
                </button>
            </div>
            </div>
        </form>
        </div>
    )
}
