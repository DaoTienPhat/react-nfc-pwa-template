
import { useRef, useState } from "react"
import { tagMap } from "./tagMap"

export default function App() {
  const [img, setImg] = useState("/assets/default.png")
  const [videoSrc, setVideoSrc] = useState("")

  const [enabled, setEnabled] = useState(false)
  const [scanned, setScanned] = useState('default text')

  const audioRef = useRef(null)
  const wakeLock = useRef(null)

  async function startKiosk() {

    try {

      if ("wakeLock" in navigator) {
        wakeLock.current = await navigator.wakeLock.request("screen")
      }

      const reader = new NDEFReader()
      await reader.scan()

      reader.onreading = (event) => {

        const uid = String(event.serialNumber).toUpperCase()
        console.log("Tag detected with UID:", uid)
        const asset = tagMap[uid] || tagMap["DEFAULT"]

        if (!asset) return
        setScanned(`${uid} - ${asset.title || "Unknown Asset"}`)

        setImg(asset.img)

        audioRef.current.src = asset.audio
        audioRef.current.play()

        setVideoSrc(asset.video || "")

      }

      setEnabled(true)

    } catch (e) {
      alert("NFC not supported or permission denied")
      console.error(e)
    }

  }

  return (
    <div className="app">
      {!enabled && (
        <button className="start" onClick={startKiosk}>
          Enable NFC Kiosk Mode
        </button>
      )}

      <div style={{ width: "100vw" }}>{scanned}</div>

      <audio ref={audioRef} />
      {videoSrc ? (
        <video
          key={videoSrc}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100vw", height: "100vh", objectFit: "contain" }}
        />
      ) :
        <img src={img} className="display" />
      }

    </div>
  )

}
