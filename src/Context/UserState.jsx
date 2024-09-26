import React, {  useState } from 'react'
import Usercontext from './UserContext'
// e=event
// radio button give checked value use gender:male===true?'male':'female'

const UserState = (props) => {
    let usrdetails=JSON.parse(localStorage.getItem('userdetails'))
    const [searchvalue, setsearchvalue] = useState('');

    const [userData, setuserData] = useState({
        login: usrdetails?usrdetails.login:false,
        email:usrdetails?usrdetails.email:''
    });
  return (
    <Usercontext.Provider value={{userData,setuserData,searchvalue, setsearchvalue}}>
        {props.children}
        </Usercontext.Provider>
  )
}

export default UserState