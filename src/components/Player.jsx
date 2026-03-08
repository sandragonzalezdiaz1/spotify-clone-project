import { usePlayerStore } from "@/store/playerStore.js"; // Estado global gestionado con Zustand
import { useRef, useEffect, useState } from "react"; 
import { Slider } from "./Slider"; // Componente de tipo barra deslizante para controlar tiempo/volumen

export const Pause = ({ className }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path>
  </svg>
);

export const Play = ({ className }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16 "
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
  </svg>
);

export const VolumeSilence = () => (
  <svg
    fill="currentColor"
    role="presentation"
    height="16"
    width="16"
    aria-hidden="true"
    aria-label="Volumen apagado"
    viewBox="0 0 16 16"
  >
    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
  </svg>
);

export const Volume = () => (
  <svg
    fill="currentColor"
    role="presentation"
    height="16"
    width="16"
    aria-hidden="true"
    aria-label="Volumen alto"
    id="volume-icon"
    viewBox="0 0 16 16"
  >
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
  </svg>
);

// Creamos un componente de la canción en reproducción
const CurrentSong = ({ image, title, artists }) => {
  // console.log({ image, title });
  return (
    <div className="flex items-center gap-5 relative overflow-hidden">
      <picture className="w-16 h-16 bg-zinc-800 rounded-md overflow-hidden">
        <img src={image} alt={title} />
      </picture>
      <div className="flex flex-col">
        <h3 className="font-semibold text-base block">{title}</h3>
        <span className="text-sm opacity-80">
          {artists?.join(", ")}{" "}
          
        </span>
      </div>
    </div>
  );
};

// Componente que controla el progreso de la canción
const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0);

  // Usamos el hook useEffect para escuchar el evento timeupdate del audio
  useEffect(() => {
    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    return () =>
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
  }, []); // Cada vez que cambia el tiempo de reproducción, actualiza el estado currentTime

  // Actualizamos el estado de la barra de audio
  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime); // currentTime devuelve el tiempo en segundos, hay que transformarlo
    // Ej: 148s -> 2:28
  };

  // Formateamos los segundos en min:seg
  const formatTime = (time) => {
    if (time == null) return "00:00";

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);
    return `${minutes}: ${seconds.toString().padStart(2, "0")}`;
  };

  const duration = audio?.current?.duration ?? 0;

  // Muestra el tiempo actual, la barra de progreso y la duración total
  // Al mover el Slider, cambia currentTime en el audio
  return (
    <div className="flex items-center gap-x-2 md:gap-x-3 text-[10px] md:text-xs pt-2 w-full min-w-0 max-w-[520px] px-2">
      <span className="opacity-50 w-8 md:w-12 text-right shrink-0">
        {formatTime(currentTime)}
      </span>
      <Slider
        value={[currentTime]}
        max={audio?.current?.duration ?? 0}
        min={0}
        className="w-full min-w-[80px] flex-1"
        onValueChange={(value) => {
          const [newCurrentTime] = value;
          audio.current.currentTime = newCurrentTime;
        }}
      />
      <span className="opacity-50 w-8 md:w-12 shrink-0">
        {duration ? formatTime(duration) : "0:00"}
      </span>
    </div>
  );
};

const VolumeControl = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const previousVolumeRef = useRef(volume); // Guarda el volumen antes de silenciar

  const isVolumeSilenced = volume < 0.1;

  const handleClickVolume = () => {
    if (isVolumeSilenced) {
      setVolume(previousVolumeRef.current);
    } else {
      previousVolumeRef.current = volume;
      setVolume(0); // Silenciamos el volumen
    }
  };

  return (
    <div className="flex justify-center gap-x-2">
      <button
        className="opacity-70 hover:opacity-100 transition"
        onClick={handleClickVolume}
      >
        {isVolumeSilenced ? <VolumeSilence /> : <Volume />}
      </button>
      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className="w-[95px]"
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeValue =
            newVolume / 100; /* El valor del volumen tiene que ser de 0 a 1 */
          setVolume(volumeValue);
        }}
      />
    </div>
  );
};

//COMPONENTE PRINCIPAL
export function Player() {
  // currentMusic es la cancion actual
  // isPlaying es el estado (play/pause)
  // audioRef es la referencia al <audio> de HTML
  const { currentMusic, isPlaying, setIsPlaying, volume } = usePlayerStore(
    (state) => state
  ); // Desestructuramos el estado global

  const audioRef = useRef(null); // Creamos una referencia al elemento audio

  useEffect(() => {
    isPlaying
      ? audioRef.current.play().catch((err) => {
          console.log("Play interrumpido", err);
        })
      : audioRef.current.pause();
  }, [isPlaying]); // Cada vez que isPlaying cambie, se ejecuta el useEffect

  useEffect(() => {
    audioRef.current.volume = volume; // Cada vez que cambiamos el volumen, tenemos que cambiar el volumen del audio
  }, [volume]);

  useEffect(() => {
    const { song, playlist, songs } = currentMusic;
    // Si tenemos una cancion
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.src = src; // Cambiamos la fuente del audio
      audioRef.current.volume = volume;
      audioRef.current.play(); // Reproducimos la cancion
    }
  }, [currentMusic]); // Cada vez que currentMusic cambie, se ejecuta el useEffect

  const handleClick = () => {
    // Cada vez que hacemos click en el boton, cambiamos el estado de isPlaying (true/false)
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center justify-center md:flex-row md:justify-between w-full px-2 md:px-4 gap-3 z-50">
      <div className="hidden md:block w-[200px]">
        <CurrentSong {...currentMusic.song} />
      </div>

      <div className="flex flex-1 justify-center min-w-0">
        <div className="flex flex-col items-center justify-center w-full min-w-0">
          <button
            className="bg-white rounded-full p-2"
            onClick={() => handleClick()}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SongControl audio={audioRef} />
          {/* Guardamos la referencia del audio en audioRef para poder manipularlo */}
          <audio ref={audioRef} />
        </div>
      </div>
      <div className="hidden md:grid place-content-center">
        <VolumeControl />
      </div>
    </div>
  );
}
