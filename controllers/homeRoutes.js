const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// router.get("/", function (req, res) {
//     req.flash('message', req.session.username);
//     res.render('homepage', { logged_in: req.session.logged_in, message: req.flash('message') });

// })

router.get("/login", (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

router.get("/register", (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('register');
})
router.get("/profile", (req, res) => {
    if(req.session.logged_in) {
       res.redirect(`/profile/${req.session.user_id}`);
       return;
        
    }
    res.redirect('/');
})

router.get("/profile/edit", (req, res) => {
    if(req.session.logged_in) { 
        res.redirect(`/profile/edit/${req.session.user_id}`);  
    return
    }
    res.redirect('/');
})

router.get("/profile/edit/:id", (req, res) => {
    if(req.session.logged_in) { 
        if(req.session.user_id == req.params.id) {
    res.render('edit-profile', { logged_in: req.session.logged_in});
    return
        }
    }
    res.redirect('/');

});

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            attributes: ['text', 'likes'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
        ]
      });
      const posts = postData.map((post) => post.get({ plain: true }));
  
      const trendingPostData = await Post.findAll({
        order: [['likes', 'DESC']],
        limit: 5,
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            attributes: ['text', 'likes'],
            include: {
              model: User,
              attributes: ['username']
            }
          }
        ]
      });
      const trendingPosts = trendingPostData.map((post) => post.get({ plain: true }));
      
      req.flash('message', req.session.username);
    // res.render('homepage', { logged_in: req.session.logged_in, message: req.flash('message') });
      res.render('homepage', { posts, trendingPosts, logged_in: req.session.logged_in, message: req.flash('message') });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

module.exports = router;