let checkKey = (req, res, next) => {
  const ApiKey = "fhgjdhcknjdscbhkhui6737dy8u3929u#%$^&@#ERfytgjhbhj";
  let apiKey = req.headers["apikey"];
  console.log(apiKey);
  if (apiKey) {
    if (apiKey === ApiKey) {
      next();
    } else {
      return res.json({
        status: false,
        msg: "ApiKey is not valid",
      });
    }
  } else {
    return res.json({
      status: false,
      msg: "ApiKey is not provided",
    });
  }
};

module.exports = {
  checkKey,
};
