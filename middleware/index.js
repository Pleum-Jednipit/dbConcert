module.exports = {
  isUser: function(req, res, next){
      if(req.session.isLogin){
          return next();
      }
      req.flash('error', 'Please Sign In First');
      var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      res.redirect('/index');
      
  },
  isAdmin: function(req,res,next){
    if(req.session.isAdmin){
        return next();
    }
    req.flash('error','You do not have permission to access this page, Please Sign In First');
    res.redirect('/admin/login');
  }
}