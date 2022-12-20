import React from "react";
import axios from "axios";
import styles from "../styles/Question.module.css"
import Link from "next/link";
import {UserContext} from '../context/auth'

interface QuestionsType{
    id:number,
    question:string,
    answer:string[],
    created_at?:Date,
    updated_at?:Date,
    multiple_choice:boolean
}
interface Data{
    questionId:number,
    question:string,
    answer:string[]
}
export default function question(){
    const [index,setIndex] = React.useState<number>(0);
    const [questions,setQuestions] = React.useState<QuestionsType[]>([]);
    const [data,setData] = React.useState<Data[]>([]) 
    const userConnected = React.useContext(UserContext)

React.useEffect(()=>{
    axios.get('http://localhost:8000/api/questions')
    .then(response =>{
        setQuestions(response.data);
    })
    .catch(error =>{console.log(error)})
},[])

const NextOrSubmit = () => {
    if(index === questions.length-1){
        axios.post('http://localhost:8000/api/register/answer', {data,email:userConnected.user.email})
        .then(response => {
                console.log(response.data)
        })
        .catch(error => {console.log(error)})
        .finally(() => {
            setIndex(index+1)  
        })
    }
    else{
        setIndex(index+1)
    }
    console.log(index,questions.length)
}

const storeData = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const addAnswer = data.findIndex((element) => element.questionId === questions[index].id )
    if(!questions[index].multiple_choice && addAnswer >-1){
        data[addAnswer].answer = [e.target.value]
    }
    if(questions[index].multiple_choice && addAnswer > -1 && e.target.checked){
        data[addAnswer].answer = [...data[addAnswer].answer,e.target.value]
    }
    if(addAnswer === -1){
        setData([...data,{question:e.target.name,questionId:questions[index].id,answer:[e.target.value]}])
    }
    if(addAnswer > -1 && !e.target.checked && questions[index].multiple_choice){
        data[addAnswer].answer.splice(data[addAnswer].answer.indexOf(e.target.value),1)
    }
}
    return(
        <>
        {questions.length > 0 && questions.length > index ? 
        <div className={styles.container}> 
            <p className={styles.question}>{questions[index].question} ?</p>
            <form className={styles.form} style={questions[index].answer.length > 2 ? {flexDirection:'column'}:{flexDirection:'row'}}>
            {questions[index].answer.map((element,key)=>
                  <label className={styles.inputGroup} key={key}>
                  <input onChange={(e)=>storeData(e)} key={questions[index].id} className={styles.radio} type={questions[index].multiple_choice ? "checkbox": "radio"} name={questions[index].question} value={element}/>
                  <div className={styles.checkmark} style={questions[index].answer.length > 2  ? {width:'400px'}:{width:'200px'}}><span className={styles.label}>{element}</span></div>
                  </label> 
                )} 
            </form>
            <div className={styles.navigation}>
                <button className={styles.button} style={index > 0 ? {visibility:'visible'} : {visibility:'hidden'}} onClick={() => setIndex(index-1)}>Annuler</button>
                <button className={styles.button}  onClick={NextOrSubmit}>Continuer</button>
            </div>
        </div>
        :
        <div className={styles.container}>
            <p className={styles.question}>Merci pour votre participation !</p>
            <button className={styles.buttonRedirect}><Link href="/">Retour a la page de login</Link></button>
        </div>}
        </>
    )
}