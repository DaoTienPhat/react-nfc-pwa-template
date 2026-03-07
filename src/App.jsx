import { useRef, useState } from "react";
import MainDisplay from "./component/main-display/MainDisplay";

export default function App() {
  const [enabled, setEnabled] = useState(false);
  const [cardUid, setCardUid] = useState(undefined);
  const [uidFromInput, setUidFromInput] = useState("");

  const wakeLock = useRef(null);

  async function startKiosk() {
    try {
      if ("wakeLock" in navigator) {
        wakeLock.current = await navigator.wakeLock.request("screen");
      }
      const reader = new NDEFReader();
      await reader.scan();

      reader.onreading = (event) => {
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
      <div class="row">
        <button
          className="btn btn-gray"
          onClick={backHome}>
          CLEAR
        </button>
        {!enabled && (
          <button class="btn btn-blue"
            onClick={startKiosk}>
            Enable NFC Kiosk Mode
          </button>
        )}
      </div>
      {!enabled && (
        <div class="row w-72">
          <input
            type="text"
            value={uidFromInput}
            onChange={handleTyping}
            placeholder="Card UID"
            class="input border py-1"
          />
          <button class="btn btn-gray" onClick={submitCard}> Try </button>
        </div>
      )}

      <MainDisplay cardUid={cardUid} />
    </div>
  );
}
