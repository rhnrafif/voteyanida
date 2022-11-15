import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Button, {ButtonRefresh} from '../components/Button'
import ButtonAdmin from '../components/ButtonAdmin'
import DataTable from '../components/DataTable'
import Judul from '../components/Judul'
import TabelIsi from '../components/TabelIsi'
import { useNavigate } from 'react-router-dom'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {getDatabase, ref, onValue} from 'firebase/database'
import {UserSekolah} from '../user/SekolahProvider'
import {UserSet} from '../user/User'
import { Sekeleton } from '../components/Sekeleton'

export default function Sd() {

  // state
  const [data, setData] = useState()
  const [vote, setVote] = useState([])
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  
  // state global
  const [isSekolah, setIsSekolah] = useContext(UserSekolah)
  const [user, setUser] = useContext(UserSet)


  // clc
  useEffect(()=>{

    // validasi session user lewat localstorage
    setUser(JSON.parse(localStorage.getItem('user')))
    
    const db = getDatabase()

    const starCountRef = ref(db, 'votesd')
    onValue(starCountRef, (snapshot)=>{
      const item = snapshot.val()

      // urutkan data berdsarkan score
      let voted = Object.values(item)

      let vote = voted.slice(0)
      vote.sort((a,b)=>{
        return b.score - a.score
      })

      setData(vote)
      setIsLogin(false)
    }) 


  },[])

  


  // login google
  const handleLogin =()=>{
    
    // validasi awal
    if(user){
      navigate('/')
      setUser(true)
      return
    }

    //validasi kedua
      let admin = prompt('Mohon tulis Identitas Anda ?')
      if(admin !== '4dM1n'){
        alert('Maaf, akses hanya bisa untuk Panitia')
        return
      }

      localStorage.setItem('user', JSON.stringify(admin))
      setUser(true)
      setIsSekolah(true)
      navigate('/')

    // const auth = getAuth()
    // const provider = new GoogleAuthProvider()

    // signInWithPopup(auth, provider)
    // .then((res)=>{

    //   localStorage.setItem('user', JSON.stringify(res.user))
    //   setUser(true)
    //   setIsSekolah(true)
    //   navigate('/')
    // })
    // .catch((err)=>{
    //   alert ('Terjadi kesalahan, Silahkan coba lagi')
    //   // console.error(err)
    // })

  }

  

  return (
    <div className='container max-w-md mx-auto pt-8 px-8'>
       <div className='flex justify-center gap-4 mt-4 mb-5'>
            {/* <Button name={'SMP/MTs'} link={'/'} click={()=>{
              setIsSekolah(false)
              navigate('/')
            }} /> */}
            <ButtonRefresh name={'Refresh'} click={()=>{
              window.location.reload()
            }} />
            {/* <Button name={'SD/MI'} link={'/'} click={()=>{
              setIsSekolah(true)
              navigate('/')

            }} /> */}
       </div>

        {isLogin && (
          <Sekeleton />
        )}

        {!isLogin && (
          <div className='w-full  max-w-[400px] bg-slate-100  flex flex-col items-center mx-auto rounded-lg pb-4 pt-3 '>
              <>
                <Judul name={'SD/MI Se-derajat'}/>
                
                <DataTable>
                  
                      { data?.map((e)=>{
                        // console.info(e)
                        return(
                          
                            <TabelIsi key={e.id} name={e.sekolah} score={e.score}  />
                            
                        )
                      })}

                </DataTable>
              </>
          </div>
        )}
      


       <div className='flex justify-center items-center my-5'>
            <ButtonAdmin onClick={handleLogin} name={'ADMIN'} />
       </div>
    </div>
  )
}
