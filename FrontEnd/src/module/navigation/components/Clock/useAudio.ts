import {useRef, useEffect} from "react";
const useAudio = (show: boolean) => {
    const audio = useRef<null | HTMLAudioElement>(null);
    useEffect(() => {
        if (show && !audio.current) {
            audio.current = new Audio();
            audio.current.src = require("asset/audio/orderPaused.mp3");
            audio.current.loop = true;
            const playPromise = audio.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.info(error);
                });
            }
        }

        if (!show && audio.current) {
            audio.current.pause();
            audio.current = null;
        }
        return () => {
            if (audio.current) {
                audio.current.pause();
                audio.current = null;
            }
        };
    }, [show]);
};
export default useAudio;
