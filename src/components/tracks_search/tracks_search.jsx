import { useEffect, useState } from 'react'
import { AddInfoTracks } from "../../server/api";
/**
 * Челочисленное деление числа val на by,потребуется при высчитывании кол-ва секунд и минут при просчитывании продолжительности треков
 * val - делимое
 * by - делитель
 */
function div(val, by){
    return (val - val % by) / by;
}
/**
 создание  элемента для вставки трека на страницу
 track-непосредственно сам трек
 id- id трека,необходимый для вставки его в качестве элемента списка
 artist-автор трека
 name- название трека
 image - url c иконкой трека
 url - адрес,по которому будет производиться поиск дополнительной информации о треке

 data - результат поиска доп.информации по url
 
 minutes - кол-во минут в длине трека(сам data.track.duration указан в милисекундах )
 seconds - кол-во секунда в длине трека
 template - сформированный элемент - трек
 Проверка'if((minutes!=0)|(seconds!=0))' нужна для того,что если у нас обе эти переменные равны нулю,
 то это значит,что изначальный data.track.duration равен нулю,т.е недоступен,а,сл-но,добавлять  его к треку на странице 
 не нужно
 'if(seconds<10){
            template=template+'0'+seconds;
        }else{
            template=template+seconds;
        }'- более грамотный формат представления  секунд,(если меньше 10,то 0+кол-во секунд(например,07))
        
       

 */
async function TrackTemplate(track,id) {
   
    const artist=track.artist;
    const name=track.name;
    let image=track.image[2]['#text'];
    const url='https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=62c6793aac570fb770b3ae0ed25ace18&artist='+encodeURIComponent(artist)+'&track='+encodeURIComponent(name) +'&format=json';
    const data= await AddInfoTracks(url).catch(alert)
    const minutes=div(data.track.duration,60000);
    const seconds=div((data.track.duration)%60000,1000);
    let time=""
    if((minutes!=0)|(seconds!=0)){
        time=time+minutes+':'
        if(seconds<10){
            time=time+'0'+seconds;
        }else{
            time=time+seconds;
        }
    }
    const template=<li className="track_search" key={id}><div className="track_icons"><img src="play-button.png" height="30" width="30" /><img src={image} height="30" width="30" /><img src="heart.png" height="30" width="30"/></div><p className ="track_search_name">{name}</p><p className ="track_search_author">{artist}</p><p className="track_search_time">{time}</p></li>
    
    return template
}
export const TracksSearch= (props)=>{
    let id=0
    
    let promises=[];
      props.tracks.forEach(track =>{
        id+=1
        promises.push(TrackTemplate(track,id))})
      const [resultFinal, setResultFinal] =useState([])
      let result=[]
     useEffect(()=>{
      Promise.all(promises).then((data1) => {
          for (let i = 0; i < data1.length; i++) {
             result.push(data1[i])
              
          }
          setResultFinal(result)
         
         
      }).catch(alert);
    },[props.tracks]
    )
      return(
        <ul className='tracks_search'>
            <p className="track_search_header">Tracks</p>
            {resultFinal.map((artist) => {
                id+=1
    return [artist,<li key={id}><p className="line_search_track">s</p></li>] 
  })}
      <a className="more_link_track" href="/">More tracks {">"}  </a>
      </ul>
        
      )
  }