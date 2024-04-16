function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
  
    console.log("nesto drugo")
    next()
  }

  module.exports={
      checkAuthenticated,
      checkNotAuthenticated
  }