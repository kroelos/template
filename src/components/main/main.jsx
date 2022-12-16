import { useEffect, useState } from 'react'
import { HotTracks } from '../hot_tracks/hot_tracks'
import{fetchArtists} from'../../server/api'
import{fetchTracks} from'../../server/api'
import {HotArtists } from '../hot_artists/hot_artists'

export const Main= ()=>{
  const [artists, setArtists] =useState([])
  const [tracks, setTracks] =useState([])
  useEffect(() => {
    fetchArtists().then((result) => setArtists(result)).catch(alert);
}, []);
useEffect(() => {
  fetchTracks().then((result) => setTracks(result)).catch(alert);
}, []);
   const isNotZeroArtist=artists.length>0
   const isNotZeroTracks=tracks.length>0
    return(
        <main className="content">
      <h1 className="music_header">Music</h1>
      <h2 className="hot_header">Hot right now</h2>
      <h3 className ="line">asdsad</h3>
      
      {isNotZeroArtist ? (
        <HotArtists artists={artists} />
      ) : (
        <div></div>
      )}
      
      <h5 className="track_header">Popular tracks</h5>
      <h6 className ="line_sound">asdsadss</h6>
      
      {isNotZeroTracks ? (
        <HotTracks tracks={tracks} />
      ) : (
        <div></div>
      )}
      </main>

    )
}