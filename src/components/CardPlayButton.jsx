import { Play, Pause } from "./Player.jsx";
import { usePlayerStore } from "@/store/playerStore.js"; //Para leer el estado global

export function CardPlayButton({ id }) {
    const { 
        currentMusic, 
        isPlaying, 
        setIsPlaying, 
        setCurrentMusic
    } = usePlayerStore(state => state)

    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id

    const handleClick = async () => {
        //Si esta sonando la playlist, la pausamos
        if(isPlayingPlaylist){
            setIsPlaying(false)
            return
        }

        // PROMISES
        //Peticion fetch: devuelve una promesa
        fetch(`/api/get-info-playlist.json?id=${id}`) 
            .then(res => res.json()) //Convertimos la respuesta en json (Podriamos hacerlo con async await)
            .then(data => {
                const { songs, playlist } = data
                setIsPlaying(true)
                setCurrentMusic({ songs, playlist, song: songs[0] }) //Reproducimos la primera cancion de la playlist
                console.log("Playlist cargada:", { songs, playlist})
            })
        
    
        // ASYNC/AWAIT
        /*
        const res = await fetch(`/api/get-info-playlist.json?id=${id}`)
        const data = await res.json()
        const { songs, playlist } = data
        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[0] }) 
        */

    }


    return (
        <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4">
           {isPlayingPlaylist ? <Pause /> : <Play />}
        </button>
    )
}