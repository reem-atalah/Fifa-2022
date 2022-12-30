export default function SVGParser({ image,h = 100,w=100 }: any) {
    const buff = new Buffer(image);
    const base64data = buff.toString('base64');
    return (
        <div>
            <img height={h} width={w} src={`data:image/svg+xml;base64,${base64data}`} alt="" />
        </div>
    )
}
