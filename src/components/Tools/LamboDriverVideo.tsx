import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import cls from "classnames";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { MdPlayArrow, MdOutlineHelp } from "react-icons/md";
import FabIcon from "../Icons/FabIcon";
/* 
// first videos lbd{i} = lambo Driver {number}
import vWebm1 from "../../media/games/lamborghini-driver/lambo-driver-1.webm";
import v3gp1 from "../../media/games/lamborghini-driver/lambo-driver-1.3gp";
import vAvi1 from "../../media/games/lamborghini-driver/lambo-driver-1.avi";
import vFlv1 from "../../media/games/lamborghini-driver/lambo-driver-1.flv";
import vMov1 from "../../media/games/lamborghini-driver/lambo-driver-1.mov";
import vOgg1 from "../../media/games/lamborghini-driver/lambo-driver-1.ogg";
// Second videos
import vWebm2 from "../../media/games/lamborghini-driver/lambo-driver-2.webm";
import v3gp2 from "../../media/games/lamborghini-driver/lambo-driver-2.3gp";
import vAvi2 from "../../media/games/lamborghini-driver/lambo-driver-2.avi";
import vFlv2 from "../../media/games/lamborghini-driver/lambo-driver-2.flv";
import vMov2 from "../../media/games/lamborghini-driver/lambo-driver-2.mov";
import vOgg2 from "../../media/games/lamborghini-driver/lambo-driver-2.ogg"; */

type VideoCountKeys = "first" | "second";
type SupportedVideo = {
  [Key in VideoCountKeys]: {
    src: string;
    type: string;
  }[];
};
type StatePlayerRef = React.MutableRefObject<ReactPlayer>["current"];
interface LamboDriverVideoProps {
  letChiefWave: () => void;
}

const prefix =
  "https://github.com/Smart-Earners-Team/tieto-evry-corporation/blob/main/src/media/games/lamborghini-driver/";

const supportedVideoMaps: SupportedVideo = {
  first: [
    { src: prefix + "lambo-driver-1.webm?raw=true", type: "video/webm" },
    { src: prefix + "lambo-driver-1.3gp?raw=true", type: "video/3gp" },
    { src: prefix + "lambo-driver-1.avi?raw=true", type: "video/avi" },
    { src: prefix + "lambo-driver-1.flv?raw=true", type: "video/flv" },
    { src: prefix + "lambo-driver-1.mov?raw=true", type: "video/mov" },
    { src: prefix + "lambo-driver-1.ogg?raw=true", type: "video/ogg" },
  ],
  second: [
    { src: prefix + "lambo-driver-2.webm?raw=true", type: "video/webm" },
    { src: prefix + "lambo-driver-2.3gp?raw=true", type: "video/3gp" },
    { src: prefix + "lambo-driver-2.avi?raw=true", type: "video/avi" },
    { src: prefix + "lambo-driver-2.flv?raw=true", type: "video/flv" },
    { src: prefix + "lambo-driver-2.mov?raw=true", type: "video/mov" },
    { src: prefix + "lambo-driver-2.ogg?raw=true", type: "video/ogg" },
  ],
};
function LamboDriverVideo({ letChiefWave }: LamboDriverVideoProps) {
  // state to track if the first video has finished playing
  const [firstCompleted, setfirstCompleted] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<StatePlayerRef | null>(
    null
  );
  const [otherPlayer, setOtherPlayer] = useState<StatePlayerRef | null>(null);
  const [muted, setMuted] = useState(false);

  const firstVideoRef = useRef<ReactPlayer | null>(null);
  const secondVideoRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    if (firstVideoRef.current && secondVideoRef.current && !firstCompleted) {
      setCurrentPlayer(firstVideoRef.current);
      setOtherPlayer(secondVideoRef.current);
    }
  }, [firstVideoRef, secondVideoRef]);

  const startEngine = async (player: ReactPlayer) => {
    getPlayer(player).play();
  };

  const toggleMute = () => setMuted((p) => !p);

  const getPlayer = (refObject: StatePlayerRef) => {
    const { getInternalPlayer } = refObject;
    return getInternalPlayer() as HTMLAudioElement;
  };

  const handleFirstPlayerEnded = () => {
    if (currentPlayer && otherPlayer) {
      setfirstCompleted(true);
      // sets the current Player to the second when the first player has ended
      setCurrentPlayer(otherPlayer);
      setOtherPlayer(null);
      getPlayer(currentPlayer).parentElement?.classList.add("hidden");
      getPlayer(otherPlayer).parentElement?.classList.remove("hidden");
      startEngine(otherPlayer);
    }
  };

  return (
    /*Responsive player 
    Set width and height to 100% and wrap the player in a fixed aspect ratio box to get a
    responsive player: see https://css-tricks.com/aspect-ratio-boxes */
    <React.Fragment>
      <div className="w-full bg-white relative">
        <ReactPlayer
          url={supportedVideoMaps["first"]}
          className={cls({ ["hidden"]: firstCompleted })}
          width="100%"
          height="100%"
          onEnded={handleFirstPlayerEnded}
          ref={(player) => (firstVideoRef.current = player)}
          pip={false}
          muted={muted}
        />
        <ReactPlayer
          url={supportedVideoMaps["second"]}
          className={cls({ ["hidden"]: firstCompleted === false })}
          width="100%"
          height="100%"
          ref={(player2) => (secondVideoRef.current = player2)}
          pip={false}
          loop
          muted={muted}
        />
      </div>
      <div className="bg-white shadow-md p-2 flex items-center justify-end w-full">
        <FabIcon
          onClick={() => {
            if (currentPlayer) startEngine(currentPlayer);
          }}
          className="lg:hidden"
        >
          <MdPlayArrow className="w-8 h-8 text-slate-500" />
        </FabIcon>
        <FabIcon onClick={letChiefWave} className="lg:hidden">
          <MdOutlineHelp className="w-8 h-8 text-slate-500" />
        </FabIcon>
        {!muted ? (
          <FabIcon onClick={toggleMute}>
            <GiSpeaker className="w-8 h-8 text-slate-500" />
          </FabIcon>
        ) : (
          <FabIcon onClick={toggleMute}>
            <GiSpeakerOff className="w-8 h-8 text-slate-500" />
          </FabIcon>
        )}
      </div>
    </React.Fragment>
  );
}

export default React.memo(LamboDriverVideo);
