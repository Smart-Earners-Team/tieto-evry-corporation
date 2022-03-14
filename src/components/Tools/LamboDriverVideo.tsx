import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player/lazy";
import cls from "classnames";
// first videos lbd{i} = lambo Driver {number}
import lbd1 from "../../media/games/lamborghini-driver/lambo-driver-1.webm";
// Second videos
import lbd2 from "../../media/games/lamborghini-driver/lambo-driver-2.webm";
import { LamboDriverVideoRef } from "../../pages/games/lamborghini-driver";

type VideoCountKeys = "first" | "second";
type SupportedVideo = {
  [Key in VideoCountKeys]: {
    src: string;
    type: string;
  }[];
};
type StatePlayerRef = React.MutableRefObject<ReactPlayer>["current"];

const supportedVideoMaps: SupportedVideo = {
  first: [{ src: lbd1, type: "video/webm" }],
  second: [{ src: lbd2, type: "video/webm" }],
};

const LamboDriverVideo = React.forwardRef<LamboDriverVideoRef>(function (
  props,
  ref
) {
  // state to track if the first video has finished playing
  const [firstCompleted, setfirstCompleted] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<StatePlayerRef | null>(
    null
  );
  const [otherPlayer, setOtherPlayer] = useState<StatePlayerRef | null>(null);

  const firstVideoRef = useRef<ReactPlayer | null>(null);
  const secondVideoRef = useRef<ReactPlayer | null>(null);

  // sets the current Player to the second when the first player has ended
  useEffect(() => {
    if (firstCompleted && otherPlayer) {
      setCurrentPlayer(otherPlayer);
      setOtherPlayer(null);
    }
  }, [firstCompleted]);

  useEffect(() => {
    if (firstVideoRef.current && secondVideoRef.current && !firstCompleted) {
      setCurrentPlayer(firstVideoRef.current);
      setOtherPlayer(secondVideoRef.current);
    }
  }, [firstVideoRef, secondVideoRef]);

  const startEngine = useCallback(async () => {
    if (currentPlayer) {
      getPlayer(currentPlayer).play();
    }
  }, [currentPlayer]);

  const toggleMute = useCallback(async () => {
    if (currentPlayer) {
      const player = getPlayer(currentPlayer);
      const muted = player.muted;
      player.muted = !muted;
    }
  }, [currentPlayer]);

  // Pass the methods above to the parent
  useImperativeHandle(ref, () => ({ startEngine, toggleMute }), [
    startEngine,
    toggleMute,
  ]);

  const getPlayer = (refObject: StatePlayerRef) => {
    const { getInternalPlayer } = refObject;
    return getInternalPlayer() as HTMLAudioElement;
  };

  const handleFirstPlayerEnded = () => {
    setfirstCompleted(true);
    if (currentPlayer && otherPlayer) {
      getPlayer(currentPlayer).parentElement?.classList.add("hidden");
      getPlayer(otherPlayer).parentElement?.classList.remove("hidden");
      startEngine();
    }
  };

  return (
    /*Responsive player 
    Set width and height to 100% and wrap the player in a fixed aspect ratio box to get a
    responsive player: see https://css-tricks.com/aspect-ratio-boxes */
    <div className="w-full bg-white relative">
      <ReactPlayer
        url={supportedVideoMaps["first"]}
        className={cls({ ["hidden"]: firstCompleted })}
        width="100%"
        height="100%"
        onEnded={handleFirstPlayerEnded}
        ref={(player) => (firstVideoRef.current = player)}
      />
      <ReactPlayer
        url={supportedVideoMaps["second"]}
        className={cls({ ["hidden"]: firstCompleted === false })}
        width="100%"
        height="100%"
        ref={(player2) => (secondVideoRef.current = player2)}
      />
    </div>
  );
});

export default LamboDriverVideo;
