const checkUser = (req, res, next) => {
    const isLogin = false
    if (!isLogin) {
        res.status(403);
        res.end("Acesss denied")
    }
    next()
}

module.exports = checkUser