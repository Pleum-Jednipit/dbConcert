module.exports = {
  isUser: function(req, res, next){
      var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      console.log(fullUrl);
      if(req.session.isLogin){
          return next();
      }
      req.session.currentPage = fullUrl
      req.flash('error', 'Please Sign In First');
      res.redirect('/login');
      
  },
  isAdmin: function(req,res,next){
    if(req.session.isAdmin){
        return next();
    }
    req.flash('error','You do not have permission to access this page, Please Sign In First');
    res.redirect('/admin/login');
  }
}