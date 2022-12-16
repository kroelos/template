import React from 'react';
import './styles.css'
import {Header} from './components/header/header'
import {Footer} from'./components/footer/footer'
import{Main} from './components/main/main'

function MainIndex() {
  
  
   return (
    <div className='app'>
     <Header/>
     <Main/>
     <Footer/>
     
     </div>
   );
 }

 export default MainIndex;