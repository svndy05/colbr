import Link from 'next/link'
import styles from '../styles/Infos.module.css'
import axios from 'axios'
import React, { useState, useContext } from 'react'
import {UserContext} from '../context/auth'
import {useRouter} from 'next/router'
interface Answers{
    id:number,
    user_id:number,
    question_id:number,
    answer:string[]
}
export default function infosUser() {
    const [user,setUser] = useState<Answers[]>([])
    const userConnected = useContext(UserContext)
    const router = useRouter();
    React.useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${userConnected.user.email}`,)
        .then(response=>{
          setUser(response.data)
        })
        .catch(error=>{router.push('/')})
   },[])
    return (
        <div className={styles.container}>
            <div>
                <p>Bonjour {userConnected.user.firstname}</p>
            </div>
            <div className={styles.containerQuestion}>
                <div className={styles.question}>
                    <p>Question 1: Avez-vous des connaissances en Finance ? </p>
                    <p>Vous avez repondu : {user.length > 0 && user[0].answer}</p>
                </div>
                { user.length > 1 &&
                <div className={styles.question}>
                    <p>Question 2: Quels produits financiers connaissez-vous ?</p>
                    <p>Vous avez repondu : {user.length > 0 && user[1].answer.join(", ")}</p>
                </div>
                }
            </div>
            <button className={styles.button} type="button"><Link href="/">Retour à la page de login</Link></button>
        </div>
    )
}