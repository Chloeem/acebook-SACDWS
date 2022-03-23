const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {

    Post.find({}, 'message createdAt likes liked likesList', {sort: {'createdAt': -1}},(err, posts) => {
        if (err) {
          throw err;
        }
        console.log(posts[0])
        res.render("posts/index", { posts: posts });
        }).populate('user').populate('userLikes');
        
      },


  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    const post = new Post({user: req.session.user._id, message: req.body.message});
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },

  Like: (req, res) => {
    Post.findOne({_id: req.body.post_id}).exec().then((post) => {
      post.userLikes.push(req.session.user._id)
      post.liked = true
      post.save()
    }).then(() => {
      res.status(201).redirect("/posts");
    })

  },

  Unlike: (req, res) => {

    Post.findOne({_id: req.body.post_id}).exec().then((post) => {
      post.userLikes.pull(req.session.user._id)
      post.liked = false
      post.save()
    }).then(() => {
      res.status(201).redirect("/posts");
    })
  },
};

module.exports = PostsController;
