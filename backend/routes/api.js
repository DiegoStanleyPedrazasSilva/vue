var express = require('express');
var router = express.Router();
var CoinInfoModel = require('../model/coin');
var TokenInfoModel = require('../model/token');
var PairInfoModel = require('../model/pair');
var UserInfoModel = require('../model/user');
var TransactionInfoModel = require('../model/transaction');
var MintInfoModel = require('../model/mint');
var BurnInfoModel = require('../model/burn');
var SwapInfoModel = require('../model/swap');
var BundleInfoModel = require('../model/bundle');

router.get('/getCoingeckoInfo', async function(req, res, next) {

    let base_currency = req.query.base_currency;
    let coinInfo = await CoinInfoModel.find({base_currency}).select('-_id -__v').lean();

    res.json([...coinInfo])
});


router.get('/getUniswapInfo', async function(req, res, next) {
    let tokenInfo = await TokenInfoModel.find({}).select('-_id -__v').populate('factory', '-_id -__v').lean();
    let pairInfo = await PairInfoModel.find({}).select('-_id -__v').lean();
    let userInfo = await UserInfoModel.find({}).select('-_id -__v').lean();
    let transactionInfo = await TransactionInfoModel.find({}).select('-_id -__v').lean();
    let mintInfo = await MintInfoModel.find({}).select('-_id -__v').lean();
    let burnInfo = await BurnInfoModel.find({}).select('-_id -__v').lean();
    let swapInfo = await SwapInfoModel.find({}).select('-_id -__v').lean();
    let bundleInfo = await BundleInfoModel.find({}).select('-_id -__v').lean();

    let response = [];
    for(const i in tokenInfo) {
        let {factory, ...tempTokenInfo} = tokenInfo[i];

        let eachPairInfo = pairInfo[i];
        let eachUserInfo = userInfo[i];
        let eachTransactionInfo = transactionInfo[i];
        let eachMintInfo = mintInfo[i];
        let eachBurnInfo = burnInfo[i];
        let eachSwapInfo = swapInfo[i];
        let eachBundleInfo = bundleInfo[i];
        response.push({factory, token: tempTokenInfo, pair: eachPairInfo, user: eachUserInfo, transaction: eachTransactionInfo, mint: eachMintInfo, burn: eachBurnInfo, swap: eachSwapInfo, bundle: eachBundleInfo});

    }

    res.json([...response])
});


module.exports = router;