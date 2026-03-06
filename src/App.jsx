
import { useRef, useState } from "react"

export default function App() {
  const [img,setImg] = useState("/assets/default.png")
  const [enabled,setEnabled] = useState(false)
  const [scanned,setScanned] = useState('default text')

  const audioRef = useRef(null)
  const wakeLock = useRef(null)

  const tagMap = {
    "04:A3:91:12:AA": {
      img: "/assets/apple.png",
      audio: "/audio/apple.mp3"
    },
    "04:77:22:88:BB": {
      img: "/assets/banana.png",
      audio: "/audio/banana.mp3"
    },
    "1D:17:B0:0A:10:80": {
      img: "/assets/akatsuki.png",
      audio: "/audio/yugioh-001.mp3"
    }
  }

  async function startKiosk(){

    try{

      if("wakeLock" in navigator){
        wakeLock.current = await navigator.wakeLock.request("screen")
      }

      const reader = new NDEFReader()
      await reader.scan()

      reader.onreading = (event)=>{

        const uid = String(event.serialNumber).toUpperCase()
        console.log("Tag detected with UID:", uid)
        setScanned(uid)
        const asset = tagMap[uid]

        if(!asset) return

        setImg(asset.img)

        audioRef.current.src = asset.audio
        audioRef.current.play()

      }

      setEnabled(true)

    }catch(e){
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
      <link rel="preload" href="/assets/apple.png" as="image" />
      <link rel="preload" href="/assets/banana.png" as="image" />
      <link rel="preload" href="/assets/akatsuki.png" as="image" />

      <div style={{width: "100vw"}}>{scanned}</div>

      <img src={img} className="display"/>

      <audio ref={audioRef}/>

    </div>
  )

}
