export function combinePath(basePath?: string, valuePath?: string) {
    let results = [];
    if (valuePath) {
        if (!basePath) { 
            return valuePath;
        }
        let baseParts = basePath.split('.');
        let valueParts = valuePath.split('.');

        for (let i = 0; i < baseParts.length; i++) {
            let basePart = baseParts[i].replace(/\[\d\]/g, '');
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
    }
    return results.join('.');
}
