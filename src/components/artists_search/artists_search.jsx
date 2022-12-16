import { useEffect, useState } from 'react'
/**
 создание элемента для вставки автора на страницу
 artist-непосредственно сам автор
 id - id автора для вставки его на страницу в качестве элемента списка
 artist.listeners - количество слушателей автора
 artist.name- имя автора
 image - url c иконкой автора
 if(artist.image[2]['#text'].length==0){
       image='https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';
    }else{
        image=artist.image[2]['#text'];
    } - это проверка на случай отсутствия обложки у автора(в json- файле в artist artist[i].image[2]['#text'] может быть пустой строкой)
     template - сформированный элемент-автор

 */
async function ArtistTemplate(artist,id) {
    let image='';
    if(artist.image[2]['#text'].length==0){
        image='https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';
     }else{
         image=artist.image[2]['#text'];
     }
    const template=<li className ="artist" key={id}><a href="/"><img src ={image} width="150" height="200"  /></a><a href="/" className="artist_name">{artist.name}</a><p className="listeners">{artist.listeners} listeners </p> </li>
    return template;

}
export const ArtistsSearch= (props)=>{
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
    },[props.artists]
    )
    
      return(
        <div className="artists">
         <p className="artists_header">Artists</p>
        <ul className="artist_icons">
        {resultFinal.map((album) => {
    return album
  })}
  <a href="/" className="more_link" >More artists {">"}</a>
      </ul>
      </div>
        
      )
  }