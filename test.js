module.exports = async(phoneNumber = "", giftToken = "") => {
    if (!(phoneNumber = (phoneNumber + "").trim()).length || phoneNumber.match(/\D/)) throw Error("INVAILD_PHONE");
    let splitToken = (giftToken += "").split("v=");
    if (18 != (giftToken = (splitToken[1] || splitToken[0]).match(/[0-9A-Za-z]+/)[0]).length) throw Error("INVAILD_VOUCHER");
    let respone = await require("petitio")(`https://gift.truemoney.com/campaign/vouchers/${giftToken}/redeem`, "POST").body({
        mobile: phoneNumber,
        voucher_hash: giftToken
    }).json();
    if ("SUCCESS" == respone.status.code) return {
        amount: Number(respone.data.voucher.redeemed_amount_baht),
        owner_full_name: respone.data.owner_profile.full_name,
        code: giftToken
    };
    throw Error(respone.status.code)
};