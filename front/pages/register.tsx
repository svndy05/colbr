import Link from 'next/link';
import styles from '../styles/Form.module.css';
import  {useForm} from 'react-hook-form';
import React from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
type FormValues = {
    firstname:string,
    name:string,
    email:string;
    password:string;
}

export default function register(){
    const router = useRouter()
    const {register, formState: { errors },handleSubmit,watch}=useForm<FormValues>()
    const onSubmit = handleSubmit((data) => {
    axios.post('http://localhost:8000/api/register',data)
    .then(response => {  
        router.push('/')
    })
    .catch(error=>console.log(error))
    
    })
    return(
            <div className={styles.container}>
                <h1 className={styles.title}>Création de ton espace Colbr</h1>
                <p className={styles.subTitle}>Deja enregistre ?  <Link className={styles.link} href="/">Connecte-toi ici</Link></p>
                <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.inputGroup}>
                        <label className={styles.label} style={watch('firstname') && watch('firstname').length > 0 ?{visibility:'visible'} :{visibility:'hidden'}} >Firstname *</label>
                    <input className={styles.input}  {...register("firstname",{required:true})} placeholder="Prenom*" type="text"/>
                  </div>
                  <div className={styles.inputGroup}>
                        <label className={styles.label} style={watch('name') && watch('name').length > 0 ?{visibility:'visible'} :{visibility:'hidden'}} >Nom *</label>
                    <input className={styles.input} {...register("name",{required:true})} placeholder="Nom*" type="text"/>
                  </div>
                  <div className={styles.inputGroup}>
                        <label className={styles.label} style={watch('email') && watch('email').length > 0 ?{visibility:'visible'} :{visibility:'hidden'}} >Email *</label>
                    <input className={styles.input} {...register("email",{required:true})} placeholder="Email*" type="text"/>
                  </div>
                    <div className={styles.inputGroup}>
                            <label className={styles.label} style={watch('password') && watch('password').length > 0 ?{visibility:'visible'} :{visibility:'hidden'}}>Mot de passe *</label>
                        <input className={styles.input} {...register("password",{required:true})} placeholder="Mot de passe*" type="password"></input>                
                    </div>
                    <input className={styles.button} type="submit" value="Création de mon espace"/>
                    {errors.firstname?.type === 'required' || errors.name?.type === 'required'|| errors.email?.type === 'required'||errors.password?.type === 'required' ? <p className={styles.alert} role="alert">Veuillez remplir tout les champs</p> : null}
                </form>
            </div>
    )
}