
import { useEffect, useRef, useState } from "react";
import { tagMap } from "src/tagMap.jsx";
import { buildVercelUrl } from "src/utils/VercelUrlBuilder.jsx";

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
		setImg(buildVercelUrl(asset.img))
		audioRef.current.src = buildVercelUrl(asset.audio);
		audioRef.current.play();
		setVideoSrc(buildVercelUrl(asset.video) || "");
	}, [cardUid]);

	return (
		<>
			<div className="w-90 text-center">{scanned}</div>
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