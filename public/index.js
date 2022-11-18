
const artists_cont= document.querySelector('.hot_authors');
const tracks_cont= document.querySelector('.tracks');
const main_input= document.querySelector('.header__input');
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
 Поиск  популярных авторов

 response - результат fetch- запроса поиска популярных авторов(const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json&limit=12');)
 data - response, трансформированный из json в объекты
 Проверка на наличие св-ва error в data нужна потому,что API last.fm обозначает ошибки в виде json-файла c 'error' и 'message'
 data.artists.artist - собственно нужный нам массив популярных авторов
 

 */
async function fetchArtists() {
    const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json&limit=12');
    const data = await response.json();
    if(data.hasOwnProperty('error')){
        throw new Error(data.message);
    }
    
    return data.artists.artist;
    
}
/**
 Поиск  популярных треков

 response - результат fetch- запроса поиска популярных треков(const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json&limit=18');)
 data - response, трансформированный из json в объекты
 Проверка на наличие св-ва error в data нужна потому,что API last.fm обозначает ошибки в виде json-файла c 'error' и 'message'
 data.tracks.track - собственно нужный нам массив популярных треков
 

 */
async function fetchTracks() {
    const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json&limit=18');
    const data = await response.json();
    if(data.hasOwnProperty('error')){
        throw new Error(data.message);
    }
    return data.tracks.track
    
}
/**
 создание текста для вставки популярного автора на страницу
 artist-непосредственно сам автор
 url - сслыка,по который происходит поиск тегов обрабатываемого автора
 response - результат fetch- запроса с url
 data - response, трансформированный из json в объекты
 Проверка на наличие св-ва error в data нужна потому,что API last.fm обозначает ошибки в виде json-файла c 'error' и 'message'
 tags - массив,в который будут помещены теги(в кол-ве 3 штук) автора
 image - url c иконкой автора
 template - собственно текст,который вставляется в html для добавления автора на страницу
 */
async function ArtistTemplate(artist) {
    let url='https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist='+encodeURIComponent(artist.name)+'&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json';
    const response = await fetch(url);
    const data = await response.json();
    if(data.hasOwnProperty('error')){
        throw new Error(data.message);
    }
    const tags=[];
    
    data.toptags.tag.forEach(element => { tags.push(element.name)
        
    })
    const image=artist.image[2]['#text'];
    const template='<li class="author"><a href="index.html" class="logo_author"><img src="'+image+'" height="110" width="110" class="logo_author" /></a><h4>'+artist.name+'</h4><e class="author_genre">'+tags[0]+'·'+tags[1]+'·'+tags[2]+'</e></li>';
    
    return template;
}
/**
 создание текста для вставки популярного трека на страницу
 track-непосредственно сам трек
 name - название трека
 image - url c иконкой трека
 url - сслыка,по который происходит поиск тегов обрабатываемого трека
 response - результат fetch- запроса с url
 data - response, трансформированный из json в объекты
 Проверка на наличие св-ва error в data нужна потому,что API last.fm обозначает ошибки в виде json-файла c 'error' и 'message'
 tags - массив,в который будут помещены теги(в кол-ве 3 штук) трека

 template - собственно текст,который вставляется в html для добавления трека на страницу
 */
async function TrackTemplate(track) {
    const artist=track.artist.name;
    const name=track.name;
    const image=track.image[2]['#text'];
    const url='https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist='+encodeURIComponent(artist)+'&track='+encodeURIComponent(name)+'&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json';
    const response = await fetch(url);
    const data = await response.json();
    if(data.hasOwnProperty('error')){
        throw new Error(data.message);
    }
    const tags=[];
    data.toptags.tag.forEach(element => { tags.push(element.name)
        
    })
    const template='<nobr><li class="track"><img src="'+image+'" height="40" width="50" class="track"/>'+name+'<p class="track_author">'+artist+'</p><p class="track_genre">'+tags[0]+'·'+tags[1]+'·'+tags[2]+'</p></li></nobr>';
    return template

}


/**
 Основная функция файла
removable_authors - список старых авторов,которые были на странице.Следующим циклом while они удаляются
artists - массив с найденными популярными  авторами
if(typeof(artists) != "undefined")- эта проверка нужна на случай,если  fetchArtists() завершился с ошибкой
(не получилось успешно найти популярных авторов)
promises- массив промисов,содержащий промисы ArtistTemplate(Или TrackTemplate, в зависимости от положения в коде) для каждого автора из artists,нужен для использования 
в дальнейшем в Promise.all 
artists_cont-контейнер,в котором хранились авторы на  странице
removable_tracks - список старых треков,которые были на странице.Следующим циклом while они удаляются
tracks - массив с найденными популярными  треками
tracks_cont - контейнер,в котором хранились треки на  странице
if(typeof(tracks) != "undefined")- эта проверка нужна на случай,если  fetchTracks() завершился с ошибкой
Добавление треков реализовано аналогично добавлению авторов

 */
async function main() {
    let removable_authors=artists_cont.getElementsByClassName('author');
    while(removable_authors.length > 0){
        removable_authors[0].parentNode.removeChild(removable_authors[0]);
    }
    const artists = await fetchArtists().catch(alert);
    if(typeof(artists) != "undefined"){
        
    
    let promises=[];
    artists.forEach(artist =>{promises.push(ArtistTemplate(artist))})
    Promise.all(promises).then((data1) => {
        for (let i = 0; i < data1.length; i++) {
            artists_cont.insertAdjacentHTML('afterbegin', data1[i]);
        }
    }).catch(alert);
}
let removable_tracks=tracks_cont.getElementsByClassName('track');
while(removable_tracks.length > 0){
    removable_tracks[0].parentNode.removeChild(removable_tracks[0]);
}
    const tracks = await fetchTracks().catch(alert);
    if(typeof(tracks) != "undefined"){
        let promises=[]
        tracks.forEach(track =>{promises.push(TrackTemplate(track))})
        Promise.all(promises).then((data1) => {
            for (let i = 0; i < data1.length; i++) {
                tracks_cont.insertAdjacentHTML('afterbegin', data1[i]);
            }
        }).catch(alert);
     
    }
    
    
}
main();
