function log(req, res, next) {
    console.log("Authentification...");
    next();
}

module.exports = log;