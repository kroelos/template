import React from 'react';
import './styles.css'
import { BrowserRouter , Routes, Route}
    from 'react-router-dom';
import MainIndex from './main_index';
import SearchResult from './search_result';
function App() {
  
  
   return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<MainIndex />} />
        <Route path='/search_result' element={<SearchResult/>} />
    </Routes>
    </BrowserRouter>
   );
 }

 export default App;
