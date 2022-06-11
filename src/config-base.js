module.exports = {
  // Testnet values
  testnet: {
    rpcEndpoint: "https://rpc.double-double-1.stargaze-apis.com/",
    restEndpoint: "https://rest.double-double-1.stargaze-apis.com/",
    chainId: "double-double-1",
    // Custom values here
    sg721: "stars1w73dekjygm4wwx6d8j6e4ymywzalhys77pw5a4z0gp023yu3a89sujy3zd", // UPDATE ME to your testnet contract
    sg721Rockets: "stars1w73dekjygm4wwx6d8j6e4ymywzalhys77pw5a4z0gp023yu3a89sujy3zd", // UPDATE ME to your testnet contract
    sg721Fuels: "stars17na9kn8jh8qd22f6xxeqa54p6atu0m0lvkwtasdqmjc52qzvt60su9nzra", // UPDATE ME to your testnet contract
    minterHumans: "stars1k77nwkyzqyagjl3yqf65kg6ryqepx97mjrjgr96sl4yvf0c6j5kskt3t64", // UPDATE ME to your testnet contract
    minterDemons: "stars174kcxuu4jzs4ap487pmqa9xjhyafyug6vu6kzp5w33dwxc9r3q4sd4cfne", // UPDATE ME to your testnet contract
    minterCephalopods: "stars1vaf7x8shaa0lvk4rguhqddm8qpz4zjur8lklxgct6hjc5hld6z0sgshswa", // UPDATE ME to your testnet contract
    minter: "stars15nxezujsnt68g390dr9ptdem7fkpeahavrsvhfx4jpavr6s4mjlsgktw64", // UPDATE ME to your testnet contract
    fileBase: "ipfs://QmXsgEM78xQ2NafaVGg9ovbui68Uf8iWoLHa4LKZ5QX2tC",
    fileUrlImages: "https://ipfs.stargaze.zone/ipfs/QmWku9yk418vikYtcwhktuBru2tU8sWReqwEg8jK7RL4Rz", // I am hosting cached versions on S3 because its much faster
    stargazeZone: "https://testnet.publicawesome.dev",
    mnemonic:
    'REPLACEME',
    // Your STARS address
    account: 'stars1dqf384y0f3epc9mldqpgwklxvylxu8qulvynnn',
  },
  // Production Values`
  production: {
    rpcEndpoint: "https://rpc.stargaze-apis.com/",
    restEndpoint: "https://lcd-stargaze.keplr.app",
    chainId: "stargaze-1",
    // Custom values here
    sg721: "stars10stecvwvxzkh3ah7y6j0kcwe3chmrg37zevjgjpz06sqx8vd5d6q5f9aeh", // UPDATE ME to your production contract
    minter: "stars1nx6l8x7kr8h5z4nvmaru264jg4rfqf0eceznfgmhyhghge4v7k5sdhey8q", // UPDATE ME to your production contract
    fileBase: "ipfs://Qmac36hALNvtCWHeqdjoothujeRCSb2ixyK6P4h3SvXceK",
    fileUrlImages: "https://stargaze.mypinata.cloud/ipfs/QmXo22D29diK5cUtPzFsWK9vcCsMwsonr1u5ZR7mMPbdzY", // I am hosting cached versions on S3 because its much faster
    fileUrlThumbnails: "https://stargaze.mypinata.cloud/ipfs/QmXo22D29diK5cUtPzFsWK9vcCsMwsonr1u5ZR7mMPbdzY",
    fileUrlMiniThumbs: "https://stargaze.mypinata.cloud/ipfs/QmXo22D29diK5cUtPzFsWK9vcCsMwsonr1u5ZR7mMPbdzY",
    stargazeZone: "https://app.stargaze.zone",
  },
  global: {
    testnet: true, // Set to false on Production
    showTestnetMsg: false,
    debug: true,
  },
};
