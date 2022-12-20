import Link from 'next/link'
import styles from '../styles/Form.module.css'
import  {useForm} from 'react-hook-form'
import React, { useState,useContext } from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'
import {UserContext} from '../context/auth'

type FormValues = {
    email:string;
    password:string;
}

export default function Login(){
    const router = useRouter();
    const [incorrect,setIncorrect] = useState<boolean>(false)
    const {register, formState: { errors },handleSubmit,watch}=useForm<FormValues>()
    const userConnected = useContext(UserContext)
    const onSubmit = handleSubmit((data) => {
        axios.post('http://localhost:8000/api/login',data)
        .then(response=>{
            userConnected.setUser({email:response.data.email,firstname:response.data.firstname})
           if(response.data.answer !== 0){
            router.push('/infos-user')
            }
            else{
                router.push('/question')
            }
            
        })
        .catch(error=>setIncorrect(true))
    })
    return(
            <div className={styles.container}>
                <h1 className={styles.title}>Accès a mon espace Colbr</h1>
                <p className={styles.subTitle}>Pas de compte ?  <Link className={styles.link} href="/register">Enregistre-toi ici</Link></p>
                <form className={styles.form} onSubmit={onSubmit}>
                  <div className={styles.inputGroup}>
                        <label className={styles.label} style={watch('email') && watch('email').length > 0 ?{visibility:'visible'} :{visibility:'hidden'}} >Email *</label>
                    <input className={styles.input} {...register("email",{required:true})} placeholder="Entrez votre adresse email" type="text"/>
                  </div>
                    <div className={styles.inputGroup}>
                            <label className={styles.label} style={watch('password') && watch('password').length > 0 ?{visibility:'visible'} :{visibility:'hidden'}}>Mot de passe *</label>
                        <input className={styles.input} {...register("password",{required:true})} placeholder="Mot de passe" type="password"/>               
                    </div>
                    <input className={styles.button} type="submit" value="Login"/>
                    {errors.email?.type === 'required'||errors.password?.type === 'required' || incorrect ? <p className={styles.alert} role="alert">Informations invalide</p> : null}

                </form>
            </div>
    )
}