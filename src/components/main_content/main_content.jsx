import { useNavigate } from "react-router";
import { searchTracks } from "../../server/api";
import { useEffect, useState } from 'react'
import { TracksSearch } from "../tracks_search/tracks_search";
import { searchArtists } from "../../server/api";
import { searchAlbums } from "../../server/api";
import { AlbumsSearch } from "../albums_search/albums_search";
import { ArtistsSearch } from "../artists_search/artists_search";
import { SearchInput } from "../search_input/search_input";
export const MainContent= (props)=>{
const navigate = useNavigate();



 

  
  

const [artists, setArtists] =useState([])
const [tracks, setTracks] =useState([])
const [albums, setAlbums] =useState([])
useEffect(() => {
    searchTracks(props.search).then((result) => setTracks(result)).catch(alert);
}, [props.search]);
useEffect(() => {
    searchArtists(props.search).then((result) => setArtists(result)).catch(alert);
}, [props.search]);
useEffect(() => {
    searchAlbums(props.search).then((result) => setAlbums(result)).catch(alert);
}, [props.search]);

const isNotZeroTracks=tracks.length>0
const isNotZeroArtists=artists.length>0
const isNotZeroAlbums=albums.length>0


    return(
      
        <main className="content_search">
          <div className="content_search_main">
          <SearchInput/>
          {isNotZeroArtists ? (
        <ArtistsSearch artists={artists} />
      ) : (
        <div></div>
      )}
          {isNotZeroAlbums ? (
        <AlbumsSearch albums={albums} />
      ) : (
        <div></div>
      )}
          {isNotZeroTracks ? (
        <TracksSearch tracks={tracks} />
      ) : (
        <div></div>
      )}
      
          </div>

          </main>
  )
}