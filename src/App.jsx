import { useRef, useState } from "react";
import MainDisplay from "./component/main-display/MainDisplay";

export default function App() {
  const [enabled, setEnabled] = useState(false);
  const [cardUid, setCardUid] = useState(undefined);
  const [uidFromInput, setUidFromInput] = useState("");
  const scannedSfx = useRef(null)
  const wakeLock = useRef(null);

  const playScannedSfx = () => {
    if (scannedSfx.current) {
      scannedSfx.current.currentTime = 0;
      scannedSfx.current.play();
    }
  };

  async function startKiosk() {
    try {
      if ("wakeLock" in navigator) {
        wakeLock.current = await navigator.wakeLock.request("screen");
      }
      const reader = new NDEFReader();
      await reader.scan();

      reader.onreading = (event) => {
        playScannedSfx();
        const uid = String(event.serialNumber).toUpperCase();
        console.log("Tag detected with UID:", uid);
        setCardUid(uid);
      };
      setEnabled(true);
    } catch (e) {
      alert("NFC not supported or permission denied");
      console.error(e);
    }
  }

  function backHome() {
    setCardUid(undefined);
    setUidFromInput("");
  }

  const submitCard = () => {
    setCardUid(uidFromInput.trim().toUpperCase());
  };
  const handleTyping = (e) => {
    setUidFromInput(e.target.value);
  };

  return (
    <div className="app row">
      <audio ref={scannedSfx} src="/sfx/zero-one.mp3" preload="auto" />
      <div className="row">
        <button
          className="btn btn-gray"
          onClick={backHome}>
          CLEAR
        </button>
        {!enabled && (
          <button className="btn btn-blue"
            onClick={startKiosk}>
            Enable NFC Kiosk Mode
          </button>
        )}
      </div>
      {!enabled && (
        <div className="row w-72">
          <input
            type="text"
            value={uidFromInput}
            onChange={handleTyping}
            placeholder="Card UID"
            className="input border py-1"
          />
          <button className="btn btn-gray" onClick={submitCard}> Try </button>
        </div>
      )}

      <MainDisplay cardUid={cardUid} />
    </div>
  );
}
