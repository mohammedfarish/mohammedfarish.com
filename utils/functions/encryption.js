const { SHA256, AES, enc } = require("crypto-js");
const Moment = require("moment-timezone");

const internalKey = process.env.INTERNAL_KEY;

const generateDaySecretKey = () => {
  const date = Moment().tz("Asia/Dubai").format("dddd-DD-MMMM-YYYY");
  const secretKey = SHA256(internalKey + date + internalKey).toString();
  return secretKey;
};

const encryptedData = (data) => {
  try {
    const secretKey = generateDaySecretKey();
    const encrypted = AES.encrypt(data, secretKey).toString();
    const encodedString = enc.Utf8.parse(encrypted);
    const encoded = enc.Base64.stringify(encodedString);
    return encoded;
  } catch (error) {
    return null;
  }
};

const decryptedData = (data) => {
  try {
    const secretKey = generateDaySecretKey();
    const encodedString = enc.Base64.parse(data);
    const decoded = enc.Utf8.stringify(encodedString);
    const decrypted = AES.decrypt(decoded, secretKey).toString(enc.Utf8);
    if (!decrypted) return false;
    return decrypted;
  } catch (error) {
    return null;
  }
};

module.exports = { encryptedData, decryptedData };
