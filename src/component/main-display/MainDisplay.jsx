
import { useEffect, useRef, useState } from "react";
import getTagMapUrl from "src/api/TagMap/getTagMap";
import { tagMap } from "src/tagMap";
import { buildVercelUrl } from "src/utils/VercelUrlBuilder.jsx";

const MainDisplay = ({ cardUid }) => {
	const [img, setImg] = useState("/assets/default.png")
	const [videoSrc, setVideoSrc] = useState("")
	const audioRef = useRef(null)
	const [scanned, setScanned] = useState("No card scanned");
	const [tagMapData, setTagMapData] = useState([]);

	useEffect(() => {
		fetch(getTagMapUrl).then(res => res.json())
			.then((data) => {
				console.log('Mapping fetched:', data);
				setTagMapData(data);
			}).catch((reason) => console.log('Fetch mapping error:', reason));
	}, [setTagMapData]);

	useEffect(() => {
		if (!tagMapData) return;
		console.log('tag map data loaded: ', tagMapData, tagMapData["HOMEPAGE"]);
		if (!cardUid) {
			setImg(tagMap["HOMEPAGE"].img)
			setScanned("No card scanned");
			setVideoSrc("");
			audioRef.current.pause();
			return;
		}
		const asset = tagMapData[cardUid.toUpperCase()] || tagMapData["DEFAULT"]
		setScanned(`${cardUid} - ${asset.title}`);
		asset.img && setImg(buildVercelUrl(asset.img));
		if (asset.audio) {
			audioRef.current.src = buildVercelUrl(asset.audio);
			audioRef.current.play();
		}
		asset.video && setVideoSrc(buildVercelUrl(asset.video) || "");
	}, [cardUid, tagMapData]);

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