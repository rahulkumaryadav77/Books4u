const middleware = {
    asyncErrorHandler: (fn) =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                   .catch(next);
    },
    escapeRegExp: (text) => {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },
    isAdmin: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        }
        // req.flash('error', 'You need to be Logged in!');
        res.redirect('/login');
    }, 
}

module.exports = middleware;
