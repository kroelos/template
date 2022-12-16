
/**
 Поиск  популярных авторов

 response - результат fetch- запроса поиска популярных авторов(const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json&limit=12');)
 data - response, трансформированный из json в объекты
 Проверка на наличие св-ва error в data нужна потому,что API last.fm обозначает ошибки в виде json-файла c 'error' и 'message'
 data.artists.artist - собственно нужный нам массив популярных авторов
 

 */
export async function fetchArtists() {
    const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json&limit=12');
    const data = await response.json();
    if(data.hasOwnProperty('error')){
        throw new Error(data.message);
    }
    
    return data.artists.artist;
    
}
/**
 Поиск дополнительной информации об авторе(для нас интерес представляют теги)
 url - полный адрес,по которому и происходит поиск доп.информации об авторе
 response - результат fetch- запроса поиска дополнительной информации об авторе(const response = await fetch(url);)
 data - response, трансформированный из json в объекты
 Проверка на наличие св-ва error в data нужна потому,что API last.fm обозначает ошибки в виде json-файла c 'error' и 'message'
 
 

 */
export async function AddInfoArtist(url){
    const response = await fetch(url);
    const data = await response.json();
    if(data.hasOwnProperty('error')){
        throw new Error(data.message);
    }
    return data
}
/**
 Поиск  популярных треков

 response - результат fetch- запроса поиска популярных треков(const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json&limit=18');)
 data - response, трансформированный из json в объекты
 Проверка на наличие св-ва error в data нужна потому,что API last.fm обозначает ошибки в виде json-файла c 'error' и 'message'
 data.tracks.track - собственно нужный нам массив популярных треков
 

 */
export async function fetchTracks() {
    const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=62c6793aac570fb770b3ae0ed25ace18&format=json&limit=18');
    const data = await response.json();
    if(data.hasOwnProperty('error')){
        throw new Error(data.message);
    }
    return data.tracks.track
    
}
/**
 Поиск дополнительной информации о треке(Если вызван в hot_tracks,то,как и в случае с популярными авторами,интерес для нас здесь представляют теги.В случае же вызова этой ф-ии в tracks_search,то нас будет интересовать 
    продолжительность трека )
 url - полный адрес,по которому и происходит поиск доп.информации о треке
 response - результат fetch- запроса поиска дополнительной информации отреке(const response = await fetch(url);)
 data - response, трансформированный из json в объекты
 Проверка на наличие св-ва error в data нужна потому,что API last.fm обозначает ошибки в виде json-файла c 'error' и 'message'
 
 

 */
export async function  AddInfoTracks(url){
    const response = await fetch(url);
    const data = await response.json();
    if(data.hasOwnProperty('error')){
        throw new Error(data.message);
    }
    return data
}
/**
 Поиск треков по названию
 search par- строка,введённая пользователем в одно из полей для ввода
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
export async function searchTracks(search_par) {
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
 search par- строка,введённая пользователем в одно из полей для ввода
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
export async function searchAlbums(search_par) {
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
 search par- строка,введённая пользователем в одно из полей для ввода
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
export async function searchArtists(search_par) {
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