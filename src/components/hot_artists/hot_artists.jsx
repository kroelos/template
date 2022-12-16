import { useEffect, useState } from 'react';
import { AddInfoArtist } from '../../server/api';
/**
 создание элемента для вставки популярного автора на страницу
 artist-непосредственно сам автор
 id- id автора,необходимый для вставки его в качестве элемента списка
 url - сслыка,по который происходит поиск тегов обрабатываемого автора
 data-результат поиска тегов по url
 tags - массив,в который будут помещены теги автора
 image - url c иконкой автора
 template - сформированный элемент - автор
 */
async function ArtistTemplate(artist,id) {
  let url='https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist='+encodeURIComponent(artist.name)+'&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json';
  let data= await AddInfoArtist(url).catch(alert)
  let template=''
  const tags=[];
  
  data.toptags.tag.forEach(element => { tags.push(element.name)
      
  })
  const image=artist.image[2]['#text'];
  if (tags.length>=3){
  template=<li className="author" key={id}><a href="/" className="logo_author"><img src={image} height="110" width="110" className="logo_author" /></a><h4>{artist.name}</h4><div className="author_genre">
    {tags[0]}·{tags[1]}·{tags[2]}
  </div></li>;
  } else if(tags.length==2){
    template=<li className="author" key={id}><a href="/" className="logo_author"><img src={image} height="110" width="110" className="logo_author" /></a><h4>{artist.name}</h4><div className="author_genre">
      {tags[0]}·{tags[1]}
    </div></li>;
  }else if(tags.length==1){
    template=<li className="author" key={id}><a href="/" className="logo_author"><img src={image} height="110" width="110" className="logo_author" /></a><h4>{artist.name}</h4><div className="author_genre">
      {tags[0]}
    </div></li>;
    }
    else{
      template=<li className="author" key={id}><a href="/" className="logo_author"><img src={image} height="110" width="110" className="logo_author" /></a><h4>{artist.name}</h4><div className="author_genre">
      
    </div></li>;
    }
    
  
  return template;
}
export const HotArtists= (props)=>{
  let id=0
  let promises=[];
 
    props.artists.forEach(artist =>{
      id+=1
      promises.push(ArtistTemplate(artist,id))})
    const [resultFinal, setResultFinal] =useState([])
    let result=[]
   useEffect(()=>{
    Promise.all(promises).then((data1) => {
        for (let i = 0; i < data1.length; i++) {
           result.push(data1[i])
            
        }
        setResultFinal(result)
       
    }).catch(alert);
  }
  ,[])
    return(
      <ul className='hot_authors'>
        {resultFinal.map((artist) => {
    return artist
  })}
      </ul>
      
    )
}