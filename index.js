
const range = (v)=>{ return [...Array(v).keys()] };

const toPredictedClassIndex = (jsArray, x,y)=>{
    const numOfLabels = 20;
    const predictValues = range(numOfLabels).map(classIndex=> jsArray[0][y][x][classIndex]);
    const maxPredictValue = predictValues.reduce( (acc,value) => (acc<value) ? value : acc );
    return range(numOfLabels).map((classIndex)=> {
        return {
            ok: (jsArray[0][y][x][classIndex] == maxPredictValue),
            index: classIndex};
    }).filter( item=> item.ok )[0].index;
};

const toCompositeColor = (srcR, srcG, srcB, maskR, maskG, maskB, maskA)=> {
    const alpha = (maskA / 255.0);
    const newR = srcR * (1.0 - alpha) + maskR * alpha;
    const newG = srcG * (1.0 - alpha) + maskG * alpha;
    const newB = srcB * (1.0 - alpha) + maskB * alpha;

    return {
        r: newR,
        g: newG,
        b: newB,
        a: 255};
};

const toARGAArray = (jsArray, jsArrayOfTargetImage512x512, imageSize, maskedColorRGBA)=>{
    const rgba = [];
    range(imageSize).forEach((y)=> {
        range(imageSize).forEach((x)=> {
            const r = jsArrayOfTargetImage512x512[y][x][0];
            const g = jsArrayOfTargetImage512x512[y][x][1];
            const b = jsArrayOfTargetImage512x512[y][x][2];
    
            const predictedClassIndex = toPredictedClassIndex(jsArray, x,y);
            if( predictedClassIndex==1 ){
                const compositeColor = toCompositeColor(
                    r,g,b,
                    maskedColorRGBA[0],
                    maskedColorRGBA[1],
                    maskedColorRGBA[2],
                    maskedColorRGBA[3]);
    
                rgba.push(compositeColor.r); // R
                rgba.push(compositeColor.g); // G
                rgba.push(compositeColor.b); // B
                rgba.push(compositeColor.a); // A
            } else {
                rgba.push(r);
                rgba.push(g);
                rgba.push(b);
                rgba.push(255);
            }
        });
    });

    return rgba;
};

const isValidImageFile = (file)=> {
    if( file!=null ){
        if( file.name.match(/\.jpg$/) || file.name.match(/\.jpeg$/) || file.name.match(/\.png$/) ){
            return true;
        } else if( file.name.match(/\.JPG$/) || file.name.match(/\.JPEG$/) || file.name.match(/\.PNG$/) ){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

if (typeof window != "undefined") {
    window.toARGAArray           = toARGAArray;
    window.isValidImageFile      = isValidImageFile;
}
