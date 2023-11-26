import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen/AuthScreen';
import Userprofile from './screens/Userprofile/Userprofile';
import Code from './screens/Code/Code';
import CodeList from './screens/CodeList/codelist';

const AllRoutes = () => {
    return(
        <Routes>
            <Route path='/' element={<HomeScreen/>} />
            <Route path='/auth' element={<AuthScreen/>} />
            <Route path='/user-profile' element={<Userprofile/>}/>
            <Route path='/code' element={<Code/>}/>
            <Route path='/codelist' element={<CodeList/>}/>
        </Routes>
    )
}

export default AllRoutes