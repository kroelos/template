import { useEffect, useState } from 'react'
/**
 создание элемента для вставки альбома на страницу
 album-непосредственно сам альбом
 id - id альбома для вставки его на страницу в качестве элемента списка
 album.artist-автор альбома
 album.name- название альбома
 image - url c иконкой альбома
 if(album.image[2]['#text'].length==0){
       image='https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';
    }else{
        image=album.image[2]['#text'];
    } - это проверка на случай отсутсвия обложки у альбома(в json- файле в album album[i].image[2]['#text'] может быть пустой строкой)
     template - сформированный элемент-альбом

 */
async function AlbumTemplate(album,id) {
    let image='';
    if(album.image[2]['#text'].length==0){
       image='https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';
    }else{
        image=album.image[2]['#text'];
    }
    
    const template=<li className ="artist" key={id}><a href="/"><img src = {image} width="150" height="200"  /></a><a href="/" className="album_name">{album.name}</a><p className="listeners">{album.artist}</p> </li>
    return template;
}
export const AlbumsSearch= (props)=>{
    let id=0
    let promises=[];
      props.albums.forEach(album =>{
        id+=1
        promises.push(AlbumTemplate(album,id))})
      const [resultFinal, setResultFinal] =useState([])
      let result=[]
     useEffect(()=>{
      Promise.all(promises).then((data1) => {
          for (let i = 0; i < data1.length; i++) {
             result.push(data1[i])
              
          }
          setResultFinal(result)
         
         
      }).catch(alert);
    },[props.albums]
    )
    
      return(
        <div className="albums">
        <p className="artists_header">Albums</p>
        <ul className="artist_icons">
        {resultFinal.map((album) => {
    return album
  })}
  <a href="/" className="more_link" >More albums {">"}</a>
      </ul>
      </div>
        
      )
  }
