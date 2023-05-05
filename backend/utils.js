import jwt from "jsonwebtoken";
// import

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "aintsecret",
    {
      expiresIn: "30d", 
    }
  );
};

// from below we want to verify user before making order, so as to know the specific user responsible for placing the orders
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  // if authorization field exist we get the token from header but slicing to get a part from the token
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // i.e Bearer XXXXXXXX
    // now decrypting the token using verify from jwt
    jwt.verify(token, process.env.JWT_SECRET || "aintsecret", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        // the res.user will now house the user informaton that was decrypted/ decoded using the decode.
        // note: the user infos were passed in the genratetoken=(user) above and now gotten using the decode below
        req.user = decode;
        next();
        // by calling the next(), the req.user found at the last line of the orderRouter will be filled with the information and we then just get only the _id from it
        // so basically the next() says the next thing to do is to fill th req.user
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};
