
import crypto from 'crypto'

import bip39 from 'bip39'
import arkjs from 'arkjs'

angular.module('wallet', [])
  .factory('wallet', () => {

    return {
      mnemonicToData: (passphrase) => {
        if (!passphrase) {
          passphrase = bip39.generateMnemonic()
        }

        let networks = arkjs.networks
        let ecpair = arkjs.ECPair.fromSeed(passphrase, networks.ark)

        let publicKey = ecpair.getPublicKeyBuffer().toString('hex')
				let address = arkjs.crypto.getAddress(publicKey, 0x4b)
        let wif = ecpair.toWIF()

        return {
          passphrase,
          passphraseqr: '{"passphrase":"'+passphrase+'"}',
          address: address,
          addressqr: '{"a":"'+address+'"}',
          publicKey: publicKey,
          wif: wif,
          entropy: bip39.mnemonicToEntropy(passphrase),
        }
      },
      validateMnemonic: (mnemonic) => {
        return bip39.validateMnemonic(mnemonic)
      },
      randomBytes: crypto.randomBytes,
      entropyToMnemonic: bip39.entropyToMnemonic
    }
  })
