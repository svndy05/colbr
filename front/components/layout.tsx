import { PropsWithChildren} from 'react'
import styles from '../styles/Layout.module.css'
import Image from 'next/image'
import logo from '../public/logo-colbr.png'
import {UserContext} from '../context/auth'
import React from 'react'
import {useRouter} from 'next/router'

export default function Layout({children}:PropsWithChildren){
    const userConnected = React.useContext(UserContext)
        const router = useRouter()
    return(<>       
            <nav className={styles.navbar} style={router.pathname !== '/register'  && router.pathname !== '/' ?  {backgroundColor:'transparent',justifyContent:'flex-start',marginLeft:'2%'}:{}}>
                <Image src={logo} alt="Logo de l'entreprise"/>
            </nav>
          <main className={styles.page}>{children}</main>
        </>
    )
}