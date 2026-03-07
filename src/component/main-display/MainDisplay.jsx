
import { useEffect, useRef, useState } from "react";
import { tagMap } from "src/tagMap.jsx";

const MainDisplay = ({ cardUid }) => {
	const [img, setImg] = useState("/assets/default.png")
	const [videoSrc, setVideoSrc] = useState("")
	const audioRef = useRef(null)
	const [scanned, setScanned] = useState("No card scanned");

	useEffect(() => {
		if (!cardUid) {
			setImg(tagMap["HOMEPAGE"].img)
			setScanned("No card scanned");
			setVideoSrc("");
			audioRef.current.pause();
			return;
		}
		const asset = tagMap[cardUid.toUpperCase()] || tagMap["DEFAULT"]
		setScanned(`${cardUid} - ${asset.title}`);
		setImg(asset.img)
		audioRef.current.src = asset.audio
		audioRef.current.play()
		setVideoSrc(asset.video || "")
	}, [cardUid]);

	return (
		<>
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
					className="display"
				/>
			) :
				<img src={img} className="display" />
			}
		</>
	)
}
export default MainDisplay;