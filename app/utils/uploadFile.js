import { Platform } from 'react-native';
import Crypto from 'crypto-js';

const isIOS = Platform.OS === 'ios';

export function UploadFile(file) {
    const ts = Math.round((new Date()).getTime() / 1000);

    const uri = file.uri;
    const type = file.type;
    const arr = file.uri.split('.');
    const ext = arr[arr.length - 1];


    const name = isIOS ? `${ts}.${ext}` : res.fileName;

    const photo = { uri, type, name };
    const apiKey = '732334713499588';
    const apiSecret = 'yA6Oo9zv2x_K__i7lO0C-Fiy0l4';
    const hash = `timestamp=${ts}${apiSecret}`;
    const signature = Crypto.SHA1(hash).toString();
    const url = 'https://api.cloudinary.com/v1_1/test-hiwex/image/upload';

    const formData = new FormData();
    formData.append('file', photo);
    formData.append('timestamp', ts);
    formData.append('api_key', apiKey);
    formData.append('signature', signature);

    return fetch(url, {
        method: 'POST',
        body: formData,
    })
        .then(res => res.json())
        .catch(err => console.log({ err }))

}