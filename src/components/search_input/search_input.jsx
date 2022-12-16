import { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
export const SearchInput= (props)=>{
    const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  /** 
   обработка ввода со стороны пользователя с последующим присваиванием пустой строки input value для очищения поля ввода после того,как пользователь нажал enter
  */  
  const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const text = formData.get('text')
        navigate('/search_result',{ state: { text }})
        setInputValue("")
        
    }
    /** 
   обработка набора в поле ввода со стороны пользователя
  */
    const handleUserInput = (event) => {
        setInputValue(event.target.value);
      };
    return(
<form className ="search" onSubmit={handleSubmit} >
          <input type="text" className="main_input" placeholder="Search here..."  name="text"  onChange={handleUserInput} value={inputValue} /><p className="input_clear"><a href="/" className="input_clear"><img src="clear.png"  className="input_clear" />
          </a></p>  <img src="glass.png"  className="input_icon" />
          </form>
    )
}