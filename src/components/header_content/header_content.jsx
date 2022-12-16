export const HeaderContent= (props)=>{
    
  
        return(
            <div className="header_content">
            <h1 className="header_search">Search results for "{props.search}"</h1>
            <div className="nav_container">
              <nav>
            <ul className="content_nav"><a href="/" className="chosen_nav_link">Top results</a>
              <li><a href="/" className="nav_link">Artists</a></li>
            <li><a href="/" className="nav_link">Albums</a></li>
          <li><a href="/" className="nav_link">Tracks</a></li>
  
            </ul>
          </nav>
            <div className="line_search">dsadsadsaddasss</div>
            </div>
          </div>
          
      )
  }
