var oderDetail = require("../models/oder_details.models")
var message = require("../until/message");

module.exports = {
    updateOderDetail: updateOderDetail
}

function updateOderDetail(id,oderDetailData){
   return oderDetail.findByIdAndUpdate(id,oderDetailData);
}