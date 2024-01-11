module.exports = (req, res, next) => {
    if(!req.session.isLoggedIn || req.session.user.role !== 'user'){
        return res.redirect('/'); // Hoặc chuyển hướng đến một trang khác tùy thuộc vào yêu cầu của bạn
    }
    next();
}
