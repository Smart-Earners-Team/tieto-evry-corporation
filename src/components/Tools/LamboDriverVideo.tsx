import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/file";
import cls from "classnames";
import { GiShare, GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { MdOutlineHelp } from "react-icons/md";
import FabIcon from "../Icons/FabIcon";
import useToast from "../../hooks/useToast";
import { useCopyText } from "../../hooks";
import Link from "../Link";
import { AiOutlineCalculator } from "react-icons/ai";

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
  openCalculator: () => void;
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
  openCalculator
}: LamboDriverVideoProps) {
  // state to track if the first video has finished playing
  const [firstCompleted, setfirstCompleted] = useState(false);
  const [firstPlayer, setFirstPlayer] = useState<StatePlayerRef | null>(null);
  const [secondPlayer, setSecondPlayer] = useState<StatePlayerRef | null>(null);
  const [muted, setMuted] = useState(false);

  const firstVideoRef = useRef<ReactPlayer | null>(null);
  const secondVideoRef = useRef<ReactPlayer | null>(null);

  const { toastSuccess, toastError } = useToast();
  const copyText = useCopyText(shareLink);

  /* In cases when users are redirected from referral link, they may not have interacted
  with the document. This effect is also used to trigger another attempt to play the video at the
  time when the chief diver modal is closed maybe */
  const playIfNotTouched = useCallback(() => {
    if (firstPlayer !== null && canStartEngine()) {
      const p = getPlayer(firstPlayer);
      if (p && !p.played) {
        p.play();
      }
    }
  }, [firstPlayer, canStartEngine]);

  useEffect(() => {
    document.addEventListener("mouseenter", playIfNotTouched);
    return () => document.removeEventListener("mouseenter", playIfNotTouched);
  });

  // set the ref.current to state when they become available
  useEffect(() => {
    if (firstVideoRef.current && secondVideoRef.current && !firstCompleted) {
      setFirstPlayer(firstVideoRef.current);
      setSecondPlayer(secondVideoRef.current);
    }
  }, [firstVideoRef, secondVideoRef]);

  const toggleMute = () => setMuted((p) => !p);

  const getPlayer = (refObject: StatePlayerRef) => {
    const { getInternalPlayer } = refObject;
    // Return HTMLAudio element
    const ele = getInternalPlayer();
    return ele as HTMLAudioElement;
  };

  const startEngine = async (player: ReactPlayer) => {
    const canStart = canStartEngine();
    if (canStart) getPlayer(player).play();
  };

  // Runs only once when the first player has ended
  const handleFirstPlayerEnded = useCallback(() => {
    if (firstPlayer !== null && secondPlayer !== null) {
      const player1 = getPlayer(firstPlayer);
      const player2 = getPlayer(secondPlayer);
      setfirstCompleted(true);
      player1.parentElement?.classList.add("hidden");
      if (!player1.ended) player1.pause();
      setFirstPlayer(null);

      player2.parentElement?.classList.remove("hidden");
      player2.loop = true;
      startEngine(secondPlayer);
    }
  }, [firstPlayer, secondPlayer]);

  // Stop engine if we cannot start because of some conditions
  const checkCanStart = useCallback(() => {
    const canStart = canStartEngine();
    // this runs only for the first video
    if (firstCompleted === false && firstPlayer !== null) {
      const player1 = getPlayer(firstPlayer);
      if (canStart && player1) {
        player1.play();
      }
      // check for player.played because some browsers do not allow
      // playing a video if the user has not interacted with the document
      else if (!canStart && player1 && player1.played) {
        player1.pause();
        player1.currentTime = 0;
      }
      // This runs only for the second video
    } else if (
      firstCompleted &&
      firstPlayer === null &&
      secondPlayer !== null
    ) {
      const player2 = getPlayer(secondPlayer);
      if (canStart && player2) {
        player2.play();
      } else if (!canStart && player2 && player2.played) {
        player2.pause();
        player2.currentTime = 0;
      }
    }
  }, [canStartEngine, firstPlayer, secondPlayer, firstCompleted]);
  checkCanStart();

  const handleShare = async () => {
    const copied = await copyText();
    if (copied) {
      toastSuccess(
        "Link Copied to Clipboard",
        "You can earn more rewards by referring friends to the game by sharing your link with them."
      );
    } else {
      toastError("Operation Failed", "Could not copy text to clipboard");
    }
  };

  return (
    /* Responsive player 
    Set width and height to 100% and wrap the player in a fixed aspect ratio box to get a
    responsive player: see https://css-tricks.com/aspect-ratio-boxes */
    <React.Fragment>
      <div
        className="w-full h-auto transition-all duration-150 bg-gray-300 relative
        pointer-events-none"
      >
        <ReactPlayer
          url={supportedVideoMaps["first"]}
          className={cls("pointer-event-none", { ["hidden"]: firstCompleted })}
          width="100%"
          height="100%"
          onEnded={handleFirstPlayerEnded}
          ref={(player) => (firstVideoRef.current = player)}
          pip={false}
          muted={muted}
          preload="auto"
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
          preload="auto"
          onPlay={checkCanStart}
        />
      </div>
      <div className="bg-white shadow p-2 flex items-center justify-between w-full">
        <Link
          className="transition-all duration-300 bg-yellow-500 rounded-full ring-yellow-700 ring-2 px-2 py-1
          text-yellow-700 font-bold text-sm mx-2"
          to="https://kryptolite.rocks/swap?outputCurrency=0xd83a832AD7202612FA53E0317DF685A5Df7cA8b8"
          rel="nofollow noopener"
          target="_blank"
        >
          Buy $LAMBO
        </Link>
        <div className="inline-block">
          <FabIcon onClick={openCalculator} title="Rewards Calculator">
            <AiOutlineCalculator className="text-slate-500" />
          </FabIcon>
          <FabIcon onClick={handleShare} title="Share">
            <GiShare className="text-slate-500" />
          </FabIcon>
          <FabIcon onClick={letChiefWave} title="Help">
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
      </div>
    </React.Fragment>
  );
}

export default React.memo(LamboDriverVideo);
