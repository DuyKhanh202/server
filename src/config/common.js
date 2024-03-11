
const Common = {
    resdata: (res,bl,mess,data) => {
        res.status(200).json({
            success: bl,
            message: mess,
            data: {
                content: data
            }
          });
    },
  };
  module.exports = Common;