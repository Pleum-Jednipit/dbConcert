module.exports = {
  isUser: function(req, res, next){
      if(req.session.isLogin){
          return next();
      }
      req.flash('error', 'Please sign in first');
      res.redirect('/index');
  },
  isAdmin: function(req,res,next){
    if(req.session.isAdmin){
        return next();
    }
    req.flash('error','You do not have permission to access this page ');
    res.redirect('/index');
  }
}