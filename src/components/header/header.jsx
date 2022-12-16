import { useEffect, useState } from 'react'
import { useNavigate } from "react-router";

export const Header= ()=>{
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  /** 
   обработка набора в поле ввода со стороны пользователя
  */
  const handleUserInput = (event) => {
    setInputValue(event.target.value);
  };
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

      return(
        <header className="header">
      <div className="player">
      <img src="player_default_album.png" height="50" width="50" className="player_icon"  />
      <img src="left.png" height="25" width="25"  />
      <img src="play-button.png" height="30" width="30" />
      <img src="right.png" height="25" width="25"  />
      <img src="heart.png" height="20" width="20"  />
      </div>
      <p className="logo"><a href="/" className="logo"><img src="logo.png" height="22" width="75" className="logo" />
      </a></p>
      <div className="header_right">
<form onSubmit={handleSubmit}>
      <input type="text" className="header__input" name="text" onChange={handleUserInput} value={inputValue}/>
      </form>
      <img src="glass.png" height="20" width="20" />
      <nav className="header_links">
        <ul className="header_links">
        <li className="header_last_fm_link"><a href="/" className="header_last_fm_link" >Home</a>
        </li>
        <li className="header_last_fm_link"><a href="/" className="header_last_fm_link" >Live</a>
      </li>
      <li className="header_last_fm_link"><a href="/" className="header_last_fm_link" >Music</a>
    </li>
    <li className="header_last_fm_link"><a href="/" className="header_last_fm_link" >Charts</a>
  </li>
  <li className="header_last_fm_link"> <a href="/" className="header_last_fm_link"> Events</a>
    
</li>
<li className="header_last_fm_link"><a href="/" className="header_last_fm_link" >Features</a>
</li>
<img src="account.png" height="50" width="50"  />
</ul>  
</nav>  
      </div> 
    </header>
    )
}