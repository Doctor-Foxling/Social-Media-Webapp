const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

//Load POst Validation

const ValidatePostInput = require("../../validator/Post-Validation/posts");

// Load Post model
const Post = require("../../modules/Post");
//Load Profile model
const Profile = require("../../modules/Profiles");

// @Route   GET api/posts/test
// @Desc    tests posts route
// @acess   Public
router.get("/test", (req, res) => res.json({ msg: "Posts Work" }));

// @Route   GET api/posts
// @Desc    get posts
// @acess   Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @Route   GET api/posts/:post_id
// @Desc    get posts by id
// @acess   Public
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No posts with that id" })
    );
});

// @Route   DELETE api/posts/:post_id
// @Desc    DELETE a post from POSTs
// @acess   Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(user => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(400).json({
              unauthorized: "Only the original poster can delete this post"
            });
          } else {
            post.remove().then(() => res.json({ success: true }));
          }
        })
        .catch(err =>
          res
            .status(404)
            .json({ nopostfound: "No post with this ID was found" })
        );
    });
  }
);

// @Route   POST api/posts/like/:post_id
// @Desc    Like a post from POSTs
// @acess   Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(user => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "You have already liked this post" });
          } else {
            post.likes.unshift({ user: req.user.id });

            post.save().then(post => res.json(post));
          }
        })
        .catch(err =>
          res
            .status(404)
            .json({ nopostfound: "No post with this ID was found" })
        );
    });
  }
);

// @Route   POST api/posts/unlike/:post_id
// @Desc    unlike a liked post from POSTs
// @acess   Private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(user => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (
            // Check to see if the logged in user has liked the post yet or not
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "You have not liked this post yet" });
          } else {
            // Get Remove Index
            const RemoveIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            // SPlice out of array
            post.likes.splice(RemoveIndex, 1);

            // Save the post with removed like
            post.save().then(post => res.json(post));
          }
        })
        .catch(err =>
          res
            .status(404)
            .json({ nopostfound: "No post with this ID was found" })
        );
    });
  }
);

// @Route   POST api/posts/comment/:post_id
// @Desc    make a comment to a post in POSTs
// @acess   Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
      .then(post => {
        // Create new comment
        const new_comment = {
          text: req.body.text,
          user: req.user.id,
          avatar: req.body.avatar,
          name: req.body.name
        };

        // Unshift the new comment on to the post.comments array
        post.comments.unshift(new_comment);

        // Save the updated post.comments array
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ nopostfound: "No post with this ID was found" })
      );
  }
);

// @Route   Delete api/posts/comment/:post_id/:comment_id
// @Desc    DELETE a comment from a post in POSTs
// @acess   Private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        // Check to see if the comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "The comment does not exist" });
        }

        // Get comment remove idex
        const Remove_Index = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice the comment out of the comment array
        post.comments.splice(Remove_Index, 1);

        // SAve
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ nopostfound: "No post with this ID was found" })
      );
  }
);

// @Route   POST api/posts/
// @Desc    POST a post to the route
// @acess   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
