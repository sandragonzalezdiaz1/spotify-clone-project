import { a as allPlaylists, s as songs } from '../../chunks/data_BGNaKFWv.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_Co-zGCQK.mjs';

// CREAMOS UNA API 
async function GET({ params, request }){
    const { url } = request;
    const urlObject = new URL(url);
    const id = urlObject.searchParams.get("id"); //Obtenemos el valor del parametro id

    const playlist = allPlaylists.find((playlist) => playlist.id === id);
    const songs$1 = songs.filter((song) => song.albumId === playlist?.albumId);

    // Devolvemos la playlist y las canciones de la playlist
    // Primer parametro: lo pasamos a cadena con JSON.stringify()
    // Segundo parametro: cabecera que indica que es un json
    return new Response(JSON.stringify({ playlist, songs: songs$1 }), {
        headers: { "Content-Type": "application/json" },
    })
    
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
