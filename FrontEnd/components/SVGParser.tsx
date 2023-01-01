export default function SVGParser({ image,h = 100,w=100 }: any) {
    let base64data = "";
    try{
        const buff = new Buffer(image);
        base64data = buff.toString('base64');
    }catch(e){
        console.log(e);
    }
    return (
        <div>
            {base64data != ""&& <img height={h} width={w} src={`data:image/svg+xml;base64,${base64data}`} alt="" />}
        </div>
    )
}
