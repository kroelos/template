import { useEffect, useState } from 'react';
import { AddInfoTracks } from '../../server/api';
/**
 создание элемента для вставки популярного трека на страницу
 track-непосредственно сам трек
 id- id трека,необходимый для вставки его в качестве элемента списка
 name - название трека
 image - url c иконкой трека
 url - сслыка,по который происходит поиск тегов обрабатываемого трека
 data-результат поиска тегов по url
 tags - массив,в который будут помещены теги трека

 template - сформированный элемент - трек
 */
async function TrackTemplate(track,id) {
    const artist=track.artist.name;
    const name=track.name;
    const image=track.image[2]['#text'];
    const url='https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist='+encodeURIComponent(artist)+'&track='+encodeURIComponent(name)+'&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json';
    let data= await AddInfoTracks(url).catch(alert)
    const tags=[];
    data.toptags.tag.forEach(element => { tags.push(element.name)
        
    })
    let template=''
    if(tags.length>=3){
    template=<li className="track" key={id}><img src={image} height="40" width="50" className="track"/>{name}<p className="track_author">{artist}</p><p className="track_genre">{tags[0]}·{tags[1]}·{tags[2]}</p></li>;
    }else if(tags.length==2){
      template=<li className="track" key={id}><img src={image} height="40" width="50" className="track"/>{name}<p className="track_author">{artist}</p><p className="track_genre">{tags[0]}·{tags[1]}</p></li>;
    }else if(tags.length==1){
      template=<li className="track" key={id}><img src={image} height="40" width="50" className="track"/>{name}<p className="track_author">{artist}</p><p className="track_genre">{tags[0]}</p></li>;
    }else{
      template=<li className="track" key={id}><img src={image} height="40" width="50" className="track"/>{name}<p className="track_author">{artist}</p><p className="track_genre">{tags[0]}</p></li>;
    }
    
    return template
}
export const HotTracks= (props)=>{
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
    },[]
    )
    
      return(
        <ul className='tracks'>
        {resultFinal.map((track) => {
    return track
  })}
      </ul>
        
      )
  }
