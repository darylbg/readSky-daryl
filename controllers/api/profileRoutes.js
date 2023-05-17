const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Post,
                    attributes: ['text', 'likes', 'private'],
                    include: [
                        {
                            model: Comment,
                            attributes: ['text', 'likes']
                        }
                    ]
                },
                
            ]
        });
        const userPosts = userData.get({ plain: true });
        console.log(userPosts);
        res.render('profilePage', { userPosts, logged_in: req.session.logged_in });

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.render('editProfilePage', { user });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
      }
});

router.put('/:id/edit', async (req, res) => {
    try {
        // Extract the user ID from the request parameters
        const userData = await User.update(req.body, {
            where: {
                id: req.params.id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
        });
      
        return res.render('homepage');
      } catch (error) {
        // Handle any errors that occur during the update process
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
      }
});


module.exports = router;
