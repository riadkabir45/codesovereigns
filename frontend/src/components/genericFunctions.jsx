export function GenericName(nameStr){
    nameStr = nameStr.replace(/\s*-\s*/g, " ");
    nameStr = nameStr.replace(/\s+/g, " ");
    const subs = nameStr.split(' ');
    if(subs.length > 1 && /^[\d.]+$/.test(subs[0]) && /^[a-zA-Z]+$/.test(subs[1])){
        if(subs[1].length > 2)
            subs[1] = subs[1].slice(0,2);
        nameStr = subs[0]+subs[1].toUpperCase()+' '+subs.slice(2).join(' ');
    }
    else if(/^\d+[a-z]/.test(subs[0])){
        subs[0] = subs[0].toUpperCase();
        nameStr = subs.join(' ');
    }
    else if(/^[\d.]+\"/.test(subs[0])){
        subs[0] = subs[0].replace('"','IN');
        nameStr = subs.join(' ');
    }
    nameStr = nameStr.trimEnd();;
    return nameStr;
}

export function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
