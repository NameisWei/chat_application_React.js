

export function getRedirectPath({sex, avatar}) {
    let url = (sex === 'female') ? '/female' : '/male';
    if (!avatar){
        url += 'info'; //maleinfo or femaleinfo
    }
    //console.log('util.js url',url)
    return url;
}