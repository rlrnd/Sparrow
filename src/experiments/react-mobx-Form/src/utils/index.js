
export function combinePath(basePath, valuePath) {
    if (!basePath) { 
        return valuePath;
    }
    else {
        let baseParts = basePath.split('.');
        let valueParts = valuePath.split('.');
        let results = [];

        for (let i = 0; i < baseParts.length; i++) {
            let basePart = baseParts[i].replace(/\[\d\]/g, "");
            let valuePart = valueParts[0];
            if (basePart !== valuePart) {
                break;
            }
            results.push(baseParts[i]);
            valueParts.splice(0, 1);
            if (valueParts.length === 0) {
                break;
            }
        }
        results.push(...valueParts);
        return results.join(".");
    }
};

export function toRelativePath(basePath, valuePath) {
    if (basePath && valuePath.indexOf(basePath) === 0) {
        return valuePath.substring(basePath.length+1);
    }
    return valuePath;
};

export function hashString(stringValue){
    let hash = 0, i, chr;
    if (stringValue.length === 0) return hash;
    for (i = 0; i < stringValue.length; i++) {
      chr   = stringValue.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();  
}



