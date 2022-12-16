
const get=window.location.search;
const param=get.split('=');
const search_par=param[1];
const artists_cont=document.querySelector('.artists');
const albums_cont=document.querySelector('.albums');
const tracks_cont=document.querySelector('.tracks_search');
const main_input= document.querySelector('.header__input');
const content_input=document.querySelector('.main_input');
/**
 * Добавляем обработчик события подтверждения ввода к полю ввода для header-а страницы
 * main_input- непоосредственно поле ввода для header-а страницы
 * searchValue - то,что находилось в поле ввода перед тем,как пользователь выделил его и нажал 'enter'
 */
main_input.addEventListener('keypress', (event) => {

    const searchValue=event.target.value;
    if(event.key==='Enter'){
    document.location.href='search_result.html?data='+searchValue;
    }
})
/**
 * Аналогично с main_unput,только для поля непосредственно внутри страницы(в html-файле - это main_input)
 * content_input - поле ввода непосредственно внутри страницы
 *  searchValue - то,что находилось в поле ввода перед тем,как пользователь выделил его и нажал 'enter'
 */
content_input.addEventListener('keypress', (event) => {

    const searchValue=event.target.value;
    if(event.key==='Enter'){
    document.location.href='search_result.html?data='+searchValue;
    }
})
/**
 * Челочисленное деление числа val на by,потребуется при высчитывании кол-ва секунд и минут при просчитывании продолжительности треков
 * val - делимое
 * by - делитель
 */
function div(val, by){
    return (val - val % by) / by;
}
/**
 Поиск треков по названию
 search par- строка,введённая пользователем в поле в header на главной  странице index.html,либо в поле в header,
 или content_search на странице search_result.html 
 url - полный адрес для API last.fm,при помощи которого и будет производится поиск треков по названию
 response - результат fetch- запроса с url
 data - response, трансформированный из json в объекты
 data.results.trackmatches.track - собственно массив из треков,полученный из response,
 у которых нам важны только название(track[i].name),автор(track[i].artist) и url,по которому можно найти 
 иконку (track[i].image[2]['#text'])
 Проверка на наличие св-ва error в data нужна потому,что API last.fm обозначает ошибки в виде json-файла c 'error' и 'message'
 св-во results может отсутсвовать,если пользователь ввёл пустую строку
 data.results.trackmatches.track.length>0 - эта проверка нужна для того случая,если не было найдено ни одного трека 
 по введённым данным(массив data.results.trackmatches.track в таком случае всё равно будет присутствовать,но будет иметь
    нулевую длину )
 

 */
async function searchTracks() {
    const url='https://ws.audioscrobbler.com/2.0/?method=track.search&track='+encodeURIComponent(search_par)+'&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json&limit=10'
    const response = await fetch(url);
    const data = await response.json();
    if(data.hasOwnProperty('error')){
        throw new Error(data.message);
    }
    
    if (data.hasOwnProperty('results')){
        if(data.results.trackmatches.track.length>0){
            return data.results.trackmatches.track;
        }
        else{
           
            return 0;
            
        }
    }
    else{
        return 0;
    }
    
}
/**
 Поиск альбомов по названию
 search par- строка,введённая пользователем в поле в header на главной  странице index.html,либо в поле в header,
 или content_search на странице search_result.html 
 url - полный адрес для API last.fm,при помощи которого и будет производится поиск альбомов по названию
 response - результат fetch- запроса с url
 data - response, трансформированный из json в объекты
 data.results.albummatches.album - собственно массив из альбомов,полученный из response,
 у которых нам важны только название(album[i].name) ,автор(album[i].artist) и url,по которому можно найти 
 иконку (album[i].image[2]['#text'])
 Проверка на наличие св-ва error в data нужна потому,что API last.fm обозначает ошибки в виде json-файла c 'error' и 'message'
 св-во results может отсутсвовать,если пользователь ввёл пустую строку
 data.results.albummatches.album.length>0 - эта проверка нужна для того случая,если не было найдено ни одного альбома 
 по введённым данным(массив data.results.albummatches.album в таком случае всё равно будет присутствовать,но будет иметь
    нулевую длину )
 

 */
async function searchAlbums() {
    const url='https://ws.audioscrobbler.com/2.0/?method=album.search&album='+search_par+'&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json&limit=8'
    const response = await fetch(url);
    const data = await response.json();
    if(data.hasOwnProperty('error')){
        throw new Error(data.message);
    }
    if (data.hasOwnProperty('results')){
        if(data.results.albummatches.album.length>0){
            
            return data.results.albummatches.album;
        }else{
            return 0;
        }
    }
    else{
        return 0;
    }
    
}
/**
 Поиск авторов по названию
 search par- строка,введённая пользователем в поле в header на главной  странице index.html,либо в поле в header,
 или content_search на странице search_result.html 
 url - полный адрес для API last.fm,при помощи которого и будет производится поиск авторов по названию
 response - результат fetch- запроса с url
 data - response, трансформированный из json в объекты
 data.results.artistmatches.artist - собственно массив из авторов,полученный из response,
 у которых нам важны только название(artist[i].name) ,кол-во слушателей(artist[i].listeners) и url,по которому можно найти 
 иконку (artist[i].image[2]['#text'])
 Проверка на наличие св-ва error в data нужна потому,что API last.fm обозначает ошибки в виде json-файла c 'error' и 'message'
 св-во results может отсутсвовать,если пользователь ввёл пустую строку
 data.results.artistmatches.artist.length>0 - эта проверка нужна для того случая,если не было найдено ни одного альбома 
 по введённым данным(массив data.results.artistmatches.artist в таком случае всё равно будет присутствовать,но будет иметь
    нулевую длину )
 

 */
async function searchArtists() {
    const url='https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + search_par + '&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json&limit=8'
    const response = await fetch(url);
    const data = await response.json();
    if(data.hasOwnProperty('error')){
        throw new Error(data.message);
    }
    if (data.hasOwnProperty('results')){
        if(data.results.artistmatches.artist.length>0){
            
            return data.results.artistmatches.artist;
        }else{
            return 0;
        }
    }
    else{
        return 0;
    }
    
}
/**
 создание текста для вставки трека на страницу
 track-непосредственно сам трек
 artist-автор трека
 name- название трека
 image - url c иконкой трека
 url - адрес,по которому будет производиться поиск дополнительной информации о треке
 response - результат fetch- запроса с url
 data - response, трансформированный из json в объекты
 Проверка на наличие св-ва error в data нужна потому,что API last.fm обозначает ошибки в виде json-файла c 'error' и 'message'
 minutes - кол-во минут в длине трека(сам data.track.duration указан в милисекундах )
 seconds - кол-во секунда в длине трека
 template - собственно текст,который вставляется в html для добавления трека на страницу
 Проверка'if((minutes!=0)|(seconds!=0))' нужна для того,что если у нас обе эти переменные равны нулю,
 то это значит,что изначальный data.track.duration равен нулю,т.е недоступен,а,сл-но,добавлять  его к треку на странице 
 не нужно
 'if(seconds<10){
            template=template+'0'+seconds;
        }else{
            template=template+seconds;
        }'- более грамотный формат представления  секунд,(если меньше 10,то 0+кол-во секунд(например,07))
        
        template=template+'<li><p class="line_search_track">s</p></li>' -в данной строке происходит добавление линии между треками

 */
async function TrackTemplate(track) {
   
    const artist=track.artist;
    const name=track.name;
    let image=track.image[2]['#text'];
    const url='https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=62c6793aac570fb770b3ae0ed25ace18&artist='+encodeURIComponent(artist)+'&track='+encodeURIComponent(name) +'&format=json';
    const response = await fetch(url);
    const data = await response.json();
    if(data.hasOwnProperty('error')){
        throw new Error(data.message);
    }
    const minutes=div(data.track.duration,60000);
    const seconds=div((data.track.duration)%60000,1000);
    let template='<li  class="track_search"><div class="track_icons"><img src="play-button.png" height="30" width="30" ><img src="'+image+'" height="30" width="30" ><img src="heart.png" height="30" width="30"></div><p class ="track_search_name">'+name+'</p><p class ="track_search_author">'+artist+'</p><p class="track_search_time">'
    if((minutes!=0)|(seconds!=0)){
        template=template+minutes+':'
        if(seconds<10){
            template=template+'0'+seconds;
        }else{
            template=template+seconds;
        }
    }
    template=template+'</p></li >';
    template=template+'<li><p class="line_search_track">s</p></li>'
    return template
}
/**
 создание текста для вставки альбома на страницу
 album-непосредственно сам альбом
 album.artist-автор альбома
 album.name- название альбома
 image - url c иконкой альбома
 if(album.image[2]['#text'].length==0){
       image='https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';
    }else{
        image=album.image[2]['#text'];
    } - это проверка на случай отсутсвия обложки у альбома(в json- файле в album album[i].image[2]['#text'] может быть пустой строкой)
     template - собственно текст,который вставляется в html для добавления альбома на страницу

 */
async function AlbumTemplate(album) {
    let image='';
    if(album.image[2]['#text'].length==0){
       image='https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';
    }else{
        image=album.image[2]['#text'];
    }
    
    const template='<li class ="artist"><a href="index.html"><img src ="'+image+'" width="150" height="200"  /></a><a href="index.html" class="album_name">'+album.name+'</a><p class="listeners">'+album.artist+'</p> </li>'
    return template;
}
/**
 создание текста для вставки автора на страницу
 artist-непосредственно сам автор
 artist.listeners - количество слушателей автора
 artist.name- имя автора
 image - url c иконкой автора
 if(artist.image[2]['#text'].length==0){
       image='https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';
    }else{
        image=artist.image[2]['#text'];
    } - это проверка на случай отсутствия обложки у автора(в json- файле в artist artist[i].image[2]['#text'] может быть пустой строкой)
     template - собственно текст,который вставляется в html для добавления автора на страницу

 */
async function ArtistTemplate(artist) {
    let image='';
    if(artist.image[2]['#text'].length==0){
        image='https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';
     }else{
         image=artist.image[2]['#text'];
     }
    const template='<li class ="artist"><a href="index.html"><img src ="'+image+'" width="150" height="200"  /></a><a href="index.html" class="artist_name">'+artist.name+'</a><p class="listeners">'+artist.listeners+' listeners </p> </li>'
    return template;

}




/**
 Основная функция файла
 removable_tracks- список старых треков,которые были на странице.Следующим циклом while они удаляются
 track_cont- контейнер,в который на странице и помещались треки
 removable_lines -старые линии между треками,которые тоже удаляются Следующим циклом while.
 removable_link и removable header - старые ссылка внизу и заголовок контейнера для треков,альбомов,или авторов(в зависимости от положения в коде) 
 соответсвенно.Для более удобной вставки треков ,альбомов или авторов удаляются.
 tracks- массив с найденными треками
 if((typeof(tracks) != "undefined")&(tracks !== 0)) - данная проверка нужна для того,чтобы определить,что поиск треков завершился
 без ошибок(иначе tracks было бы undefined),и нашёлся хотя бы один трек
 (в противном случае ф-ия  searchTracks() вернёт ноль и tracks будет 0  ) 
 promises - массив промисов,содержащий промисы TrackTemplate для каждого трека из tracks,нужен для использования 
в дальнейшем в Promise.all 
if(i==0){
                    tracks_cont.insertAdjacentHTML('afterbegin','<a class="more_link_track" href="index.html">More tracks &nbsp&nbsp  > </a>')
                } - добавление удалённой ранее ссылки контейнера для треков на страницу
if (i==(data1.length-1)){
                    tracks_cont.insertAdjacentHTML('afterbegin','<p class="track_search_header">Tracks</p>')
                } - добавление удалённого ранее заголовка контейнера треков на страницу


if(typeof(data1[i]) != "undefined"){
                tracks_cont.insertAdjacentHTML('afterbegin', data1[i]);
                } - добавление трека с иконкой на страницу(если текст для вставки был успешно создан 
                    (соответсувующий TrackTemplate(track)) завершился без ошибок )
аналогичным образом реализованы потом добавление заголовков,ссылок для контейнера авторов и альбомов.
Ну и,собственно,самих альбомов и авторов на страницу
removable_albums-список старых альбомов,которые были на странице.Следующим циклом while они удаляются
albums_cont- контейнер,в котором на странице хранились альбомы
list - список ,в котором на странице хранились альбомы
albums-массив с найденными  альбомами
Отличие вставки альбомов от вставки треков заключается в том,что альбомы вставляются в list,в остальном - всё аналогично
removable_artists - список старых авторов,которые были на странице.Следующим циклом while они удаляются
artists_cont - контейнер,в котором на странице хранились авторы
list_artist -  список ,в котором на странице хранились авторы
artists - массив с найденными  авторами
header - заголовок содержимого страницы,у которого в следующей строке изменяется содержимое в соответствии с тем,
что нужно искать
 */

async function main() {
    let removable_tracks=tracks_cont.getElementsByClassName('track_search');
    while(removable_tracks.length > 0){
        removable_tracks[0].parentNode.removeChild(removable_tracks[0]);
    }
    let removable_lines=tracks_cont.getElementsByClassName('line_search_track');
    
    while(removable_lines.length > 0){
        removable_lines[0].parentNode.removeChild(removable_lines[0]);
    }
    let removable_link=tracks_cont.getElementsByClassName('more_link_track')
 
    while(removable_link.length > 0){
        removable_link[0].parentNode.removeChild(removable_link[0]);
    }
    let removable_header=tracks_cont.getElementsByClassName('track_search_header')
    while(removable_header.length > 0){
        removable_header[0].parentNode.removeChild(removable_header[0]);
    }
    
    const tracks= await searchTracks().catch(alert);

    if((typeof(tracks) != "undefined")&(tracks !== 0)){
        
        let promises=[];
        tracks.forEach(track =>{promises.push(TrackTemplate(track).catch(alert))})
        Promise.all(promises).then((data1) => {
            for (let i = 0; i < data1.length; i++) {
                if(i==0){
                    tracks_cont.insertAdjacentHTML('afterbegin','<a class="more_link_track" href="index.html">More tracks &nbsp&nbsp  > </a>')
                }
                if(typeof(data1[i]) != "undefined"){
                tracks_cont.insertAdjacentHTML('afterbegin', data1[i]);
                }

                if (i==(data1.length-1)){
                    tracks_cont.insertAdjacentHTML('afterbegin','<p class="track_search_header">Tracks</p>')
                }
            }
        }).catch(alert);
    
    


    }
    let removable_albums=albums_cont.getElementsByClassName('artist');
    while(removable_albums.length > 0){
        removable_albums[0].parentNode.removeChild(removable_albums[0]);
    }
    removable_link=albums_cont.getElementsByClassName('more_link')

while(removable_link.length > 0){
    removable_link[0].parentNode.removeChild(removable_link[0]);
}
removable_header=albums_cont.getElementsByClassName('artists_header')
while(removable_header.length > 0){
    removable_header[0].parentNode.removeChild(removable_header[0]);
}
let list=albums_cont.getElementsByClassName('artist_icons');
const albums=await searchAlbums().catch(alert);
if((typeof(albums) != "undefined")&(albums !== 0)){
    let promises_albums=[];
    albums.forEach(album =>{promises_albums.push(AlbumTemplate(album).catch(alert))})
    Promise.all(promises_albums).then((data1) => {
        for (let i = 0; i < data1.length; i++) {
            if(i==0){
                list[0].insertAdjacentHTML('afterend','<a href="index.html" class="more_link">More albums &nbsp&nbsp  ></a>  ')
            }
            if(typeof(data1[i]) != "undefined"){
            list[0].insertAdjacentHTML('afterbegin', data1[i]);
            }

            if (i==(data1.length-1)){
                list[0].insertAdjacentHTML('beforebegin','<p class="artists_header">Albums</p><ul  class="artist_icons">')
            }
        }
    }).catch(alert);
    
   




}
let removable_artists=artists_cont.getElementsByClassName('artist');
    while(removable_artists.length > 0){
        removable_artists[0].parentNode.removeChild(removable_artists[0]);
    }
    removable_link=artists_cont.getElementsByClassName('more_link')

while(removable_link.length > 0){
    removable_link[0].parentNode.removeChild(removable_link[0]);
}
removable_header=artists_cont.getElementsByClassName('artists_header')
while(removable_header.length > 0){
    removable_header[0].parentNode.removeChild(removable_header[0]);
}
let list_artist=artists_cont.getElementsByClassName('artist_icons')[0]
const artists=await searchArtists().catch(alert);
if((typeof(artists) != "undefined")&(artists !== 0)){
    let promises_artists=[];
    artists.forEach(artist =>{promises_artists.push(ArtistTemplate(artist).catch(alert))})
    Promise.all(promises_artists).then((data1) => {
        for (let i = 0; i < data1.length; i++) {
            if(i==0){
                list_artist.insertAdjacentHTML('afterend','<a href="index.html" class="more_link">More artists &nbsp&nbsp  ></a>')
            }
            if(typeof(data1[i]) != "undefined"){
            list_artist.insertAdjacentHTML('afterbegin', data1[i]);
            }

            if (i==(data1.length-1)){
                list_artist.insertAdjacentHTML('beforebegin','<p class="artists_header">Artists</p>')
            }
        }
    }).catch(alert);
}
let header=document.querySelector('.header_search')
header.textContent='Search Search results for "'+decodeURI(search_par)+'"'
}
main()
