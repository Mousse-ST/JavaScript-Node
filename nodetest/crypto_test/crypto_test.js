const crypto = require("crypto");


// ** MD5和SHA1
const hash = crypto.createHash('md5', 'utf8'); // MD5
// const hash = crypto.createHash('sha1', 'utf8'); // SHA1

// 我们可以在做加密的时候自己设置一个不对外公开的key,拼接到要加密的内容里面
hash.update('Hello, world!');
// 可任意多次调用update():
hash.update('Hello, node!');

console.log(hash.digest('hex').toUpperCase());


// ** Hmac
// 可以把Hmac理解为用随机数“增强”的哈希算法
const hmac = crypto.createHmac('sha256', 'secret-key'); // Hmac还需要一个密钥

hmac.update('Hello, world!');

console.log(hmac.digest('hex')); // 80f7e22570...


// ** AES
// AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，可以封装好函数，方便使用
// AES有很多不同的算法，如aes192，aes-128-ecb，aes-256-cbc等,加密结果有两种表示方法：hex和base64
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);
console.log(data === decrypted);


// ** Diffie-Hellman
// DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下计算出一个密钥来。
var userA = crypto.createDiffieHellman(512);
var userA_keys = userA.generateKeys();

var prime = userA.getPrime();
var generator = userA.getGenerator();

console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

var userB = crypto.createDiffieHellman(prime, generator);
var userB_keys = userB.generateKeys();

var userA_secret = userA.computeSecret(userB_keys);
var userB_secret = userB.computeSecret(userA_keys);

console.log('Secret of userA: ' + userA_secret.toString('hex'));
console.log('Secret of userB: ' + userB_secret.toString('hex'));
