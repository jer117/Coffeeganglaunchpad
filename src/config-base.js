module.exports = {
  // Testnet values
  testnet: {
    rpcEndpoint: "https://rpc.double-double-1.stargaze-apis.com/",
    restEndpoint: "https://rest.double-double-1.stargaze-apis.com/",
    chainId: "double-double-1",
    // Custom values here
    sg721: "stars1w73dekjygm4wwx6d8j6e4ymywzalhys77pw5a4z0gp023yu3a89sujy3zd", // UPDATE ME to your testnet contract
    sg721Rockets: "stars186tjfdguldrvrt6dcyqk0afwv5pcm8tl9y2p2qvjf36vfwlxnu5qys7pue", // UPDATE ME to your testnet contract
    sg721Fuels: "stars1a2akm58cv8p0qk5yw398mm4zg3jw3ee5j8qyq9hzfwzpg07kgqqsfy4c2s", // UPDATE ME to your testnet contract
    minterHumans: "stars19equv33mget3ank0yxr5k3my7u9t6f7fakdy42g5rc4mv0ycaz3s3pfy3j", // UPDATE ME to your testnet contract
    minterDemons: "stars10l8a3uzxeqy955rk2h485cdswdtxvegdgzsr5cxuzlpah4l36t3q5msp3k", // UPDATE ME to your testnet contract
    minterCephalopods: "stars1tz5rc4lpl5rcud7hscgkfnnchf0x9nzgka8ccsnkjvp0utjdtvzqtmufw5", // UPDATE ME to your testnet contract
    minterEpics: "stars1k7pluj4gck66mrsmrntmcrhqgla2za0jj4pfsgq2ywxf6534stmqd7hmuj",
    minter: "stars15nxezujsnt68g390dr9ptdem7fkpeahavrsvhfx4jpavr6s4mjlsgktw64", // UPDATE ME to your testnet contract
    fileBase: "ipfs://QmXsgEM78xQ2NafaVGg9ovbui68Uf8iWoLHa4LKZ5QX2tC",
    fileUrlImages: "https://ipfs.stargaze.zone/ipfs/QmWku9yk418vikYtcwhktuBru2tU8sWReqwEg8jK7RL4Rz", // I am hosting cached versions on S3 because its much faster
    stargazeZone: "https://testnet.publicawesome.dev",
    account: 'stars14yc957g6dqcvsp45l8ar2l8fnysy4y4p6fn4r3',
    fuelMetadataUrl: 'https://stargaze.mypinata.cloud/ipfs/QmRvYPEHjsyXSg5UfqwnPoKMqcPuMHpo8ip5ReTCLh7621/',
  },
  // Production Values`
  production: {
    rpcEndpoint: "https://rpc.stargaze-apis.com/",
    restEndpoint: "https://lcd-stargaze.keplr.app",
    chainId: "stargaze-1",
    // Custom values here
    sg721: "stars10stecvwvxzkh3ah7y6j0kcwe3chmrg37zevjgjpz06sqx8vd5d6q5f9aeh", // UPDATE ME to your production contract
    sg721Rockets: "stars12jj0nj3dk5uk4ldw4hkhx0y8ewx7ts53vfsamjjwyhdpjnwlh7xsyv3f74", // UPDATE ME to your testnet contract
    sg721Fuels: "stars18nj7a5p6g7agf76zyp2nrnv0fcjrfvsc82c5w7zzsdyjzgq0na3sfq92uz", // UPDATE ME to your testnet contract
    minterHumans: "stars19pa0986q29kqcftj2l6m3d8a4v7j2gvjwmys5y07k8939wjyyzds958vn9", // UPDATE ME to your testnet contract
    minterDemons: "stars19d5u0gt66j0u4fwg0vatnr4eht8xfzcasv6z0e65qrx653m9razq30at54", // UPDATE ME to your testnet contract
    minterCephalopods: "stars13n679843y9443rxjcrvuv3u588cftj8wd95e2zvuc2svl3c4908sm4pxmh", // UPDATE ME to your testnet contract
    minterEpics: "stars1f07f287jqgqyy7qdcwazv3d34dtr27t3l3j59amt8e4zvz8a66rsse2zlv",
    minter: "stars1nx6l8x7kr8h5z4nvmaru264jg4rfqf0eceznfgmhyhghge4v7k5sdhey8q", // UPDATE ME to your production contract
    fileBase: "ipfs://Qmac36hALNvtCWHeqdjoothujeRCSb2ixyK6P4h3SvXceK",
    fileUrlImages: "https://stargaze.mypinata.cloud/ipfs/QmXo22D29diK5cUtPzFsWK9vcCsMwsonr1u5ZR7mMPbdzY", // I am hosting cached versions on S3 because its much faster
    fileUrlThumbnails: "https://stargaze.mypinata.cloud/ipfs/QmXo22D29diK5cUtPzFsWK9vcCsMwsonr1u5ZR7mMPbdzY",
    fileUrlMiniThumbs: "https://stargaze.mypinata.cloud/ipfs/QmXo22D29diK5cUtPzFsWK9vcCsMwsonr1u5ZR7mMPbdzY",
    stargazeZone: "https://app.stargaze.zone",
    account: 'stars14yc957g6dqcvsp45l8ar2l8fnysy4y4p6fn4r3',
    fuelMetadataUrl: 'https://stargaze.mypinata.cloud/ipfs/QmRvYPEHjsyXSg5UfqwnPoKMqcPuMHpo8ip5ReTCLh7621/',
  },
  global: {
    testnet: false, // Set to false on Production
    showTestnetMsg: false,
    debug: true,
  },
};
