import { allPlaylists, songs as allSongs } from "@/lib/data";

//CREAMOS UNA API 
export async function GET({ params, request }){
    const { url } = request;
    const urlObject = new URL(url);
    const id = urlObject.searchParams.get("id"); //Obtenemos el valor del parametro id

    const playlist = allPlaylists.find((playlist) => playlist.id === id)
    const songs = allSongs.filter((song) => song.albumId === playlist?.albumId)

    //Devolvemos la playlist y las canciones de la playlist
    //Primer parametro: lo pasamos a cadena con JSON.stringify()
    //Segundo parametro: cabecera que indica que es un json
    return new Response(JSON.stringify({ playlist, songs }), {
        headers: { "Content-Type": "application/json" },
    })
    
}