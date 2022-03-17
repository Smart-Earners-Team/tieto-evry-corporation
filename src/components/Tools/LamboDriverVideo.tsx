import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import cls from "classnames";
import { GiShare, GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { MdOutlineHelp } from "react-icons/md";
import FabIcon from "../Icons/FabIcon";
import useToast from "../../hooks/useToast";
import { useCopyText } from "../../hooks";

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
  shareLink: string;
  canStartEngine: () => boolean;
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
function LamboDriverVideo({
  letChiefWave,
  shareLink,
  canStartEngine,
}: LamboDriverVideoProps) {
  // state to track if the first video has finished playing
  const [firstCompleted, setfirstCompleted] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<StatePlayerRef | null>(
    null
  );
  const [otherPlayer, setOtherPlayer] = useState<StatePlayerRef | null>(null);
  const [muted, setMuted] = useState(false);

  const firstVideoRef = useRef<ReactPlayer | null>(null);
  const secondVideoRef = useRef<ReactPlayer | null>(null);

  const { toastSuccess, toastError } = useToast();
  const copyText = useCopyText(shareLink);

  // set the ref.current to state when they become available
  useEffect(() => {
    if (firstVideoRef.current && secondVideoRef.current && !firstCompleted) {
      setCurrentPlayer(firstVideoRef.current);
      setOtherPlayer(secondVideoRef.current);
    }
  }, [firstVideoRef, secondVideoRef]);

  const startEngine = async (player: ReactPlayer) => {
    const canStart = canStartEngine();
    if (canStart) getPlayer(player).play();
  };

  const toggleMute = () => setMuted((p) => !p);

  const getPlayer = (refObject: StatePlayerRef) => {
    const { getInternalPlayer } = refObject;
    // Return HTMLAudio element
    const ele = getInternalPlayer();
    return ele as HTMLAudioElement;
  };

  // Runs only once when the first player has ended
  const handleFirstPlayerEnded = useCallback(() => {
    if (currentPlayer !== null && otherPlayer !== null) {
      setfirstCompleted(true);
      // sets the current Player to the second when the first player has ended
      setCurrentPlayer(otherPlayer);
      getPlayer(currentPlayer).parentElement?.classList.add("hidden");
      getPlayer(otherPlayer).parentElement?.classList.remove("hidden");
      getPlayer(otherPlayer).loop = true;
      startEngine(otherPlayer);
      setOtherPlayer(null);
    }
  }, [currentPlayer, otherPlayer]);

  const handleShare = async () => {
    const copied = await copyText();
    if (copied) {
      toastSuccess(
        "Link Copied to Clipboard",
        "You can referrer friends to the game and earn more rewards by sharing your link with them."
      );
    } else {
      toastError("Operation Failed", "Could not copy text to clipboard");
    }
  };

  // Stop engine if we cannot start because of some conditions
  const checkCanStart = useCallback(() => {
    const canStart = canStartEngine();
    if (currentPlayer !== null) {
      const player = getPlayer(currentPlayer);
      if (canStart && player) {
        player.play();
      }
      // check for player.played because some browsers does not allow
      // playing a video if the user has not interacted with the document
      else if (!canStart && player && player.played) {
        player.pause();
        player.currentTime = 0;
      }
    }
  }, [canStartEngine, currentPlayer]);
  checkCanStart();

  return (
    /* Responsive player 
    Set width and height to 100% and wrap the player in a fixed aspect ratio box to get a
    responsive player: see https://css-tricks.com/aspect-ratio-boxes */
    <React.Fragment>
      <div className="w-full bg-gray-300 relative pointer-events-none">
        <ReactPlayer
          url={supportedVideoMaps["first"]}
          className={cls("pointer-event-none", { ["hidden"]: firstCompleted })}
          width="100%"
          height="100%"
          onEnded={handleFirstPlayerEnded}
          ref={(player) => (firstVideoRef.current = player)}
          pip={false}
          muted={muted}
          onPlay={checkCanStart}
        />
        <ReactPlayer
          url={supportedVideoMaps["second"]}
          className={cls("pointer-event-none", {
            ["hidden"]: firstCompleted === false,
          })}
          width="100%"
          height="100%"
          ref={(player2) => (secondVideoRef.current = player2)}
          pip={false}
          loop
          muted={muted}
          onPlay={checkCanStart}
        />
      </div>
      <div className="bg-white shadow p-2 flex items-center justify-end w-full">
        <FabIcon onClick={handleShare} title="Share">
          <GiShare className="text-slate-500" />
        </FabIcon>
        <FabIcon onClick={letChiefWave} className="lg:hidden" title="Help">
          <MdOutlineHelp className="text-slate-500" />
        </FabIcon>
        {!muted ? (
          <FabIcon onClick={toggleMute} title="Unmute Sound">
            <GiSpeaker className="text-slate-500" />
          </FabIcon>
        ) : (
          <FabIcon onClick={toggleMute} title="Mute Sound">
            <GiSpeakerOff className="text-slate-500" />
          </FabIcon>
        )}
      </div>
    </React.Fragment>
  );
}

export default React.memo(LamboDriverVideo);
