let bip39 = require("bip39");
let { hdkey } = require("ethereumjs-wallet");
let util = require("ethereumjs-util");
 
// 生成一个
function single() {
  let mnemonic = bip39.generateMnemonic();
  let seed = bip39.mnemonicToSeedSync(mnemonic);
  let hdWallet = hdkey.fromMasterSeed(seed);
  let key = hdWallet.derivePath("m/44'/60'/0'/0/0");
  let address = util.toChecksumAddress(
    "0x" + util.pubToAddress(key._hdkey._publicKey, true).toString("hex")
  );
  console.log("助记词:" + mnemonic);
  console.log("地址:" + address);
}
 
// 生成多个
function batch(count, startIndex = 0) {
  let mnemonic = bip39.generateMnemonic();
  let seed = bip39.mnemonicToSeedSync(mnemonic);
  let hdWallet = hdkey.fromMasterSeed(seed);
  let address_list = [];
  //console.log("助记词:" + mnemonic);
  
  for (let i = startIndex; i < startIndex + count; i++) {
    let key = hdWallet.derivePath(`m/44'/60'/0'/0/${i}`);
    let address = util.toChecksumAddress(
      "0x" + util.pubToAddress(key._hdkey._publicKey, true).toString("hex")
    );
    address_list.push(address);
  }
  console.log(JSON.stringify(address_list));
}

single();
