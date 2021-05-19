import CryptoJS from 'crypto-js';
export function Encode(message){
  const aseKey = '4c25fa5a'
  return CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(aseKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
}
export function Decode(ASEString,aseKey){
  CryptoJS.AES.decrypt(ASEString, CryptoJS.enc.Utf8.parse(aseKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
}