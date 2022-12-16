import React from 'react';
import './styles.css'
import {Header} from './components/header/header'
import {Footer} from'./components/footer/footer'
import { useLocation } from 'react-router';
import { HeaderContent } from './components/header_content/header_content';
import { MainContent } from './components/main_content/main_content';
function SearchResult() {
    const {state} = useLocation();
    const search=state.text
  
   return (
    <div className='app'>
     <Header/>
     <HeaderContent search={search}/>
     <hr size="1px" color="gray" ></hr>
     <MainContent search={search}/>
     <Footer/>
     
     </div>
   );
 }

 export default SearchResult;