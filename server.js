var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
app.get('/posts', function(request, response){
  Post.find({}).exec(function(err, post){
    console.log(post)
    response.send(post)
  })
})
// 2) to handle adding a post
app.post('/posts', function(request, response){
var newPost = new Post(request.body)
newPost.save(function(err, result){
  if (err){
    console.log(err)
  } else {
    response.send(newPost)
  }
})
})
// 3) to handle deleting a post
app.delete('/posts/:id', function(req, res){
  Post.findByIdAndRemove(req.params.id).exec(function(err, post){
    if (err){
      console.log(err)
    } else {
      Post.find({}).exec(function(err, posts){
        if (err){
          console.log(err)
        } else {
          res.send(posts)
        }
      })
    }
  })
})
// 4) to handle adding a comment to a post
app.post('/posts/:id/comments', function(req, res){
  var newComment = req.body
  console.log('_____________________________new comment')
  console.log(newComment)
  Post.findByIdAndUpdate(req.params.id, { $push: { comments: newComment }}).exec(function(err, post, newComment){
    if (err){
      console.log(err)
    } else {
      Post.find({}).exec(function(err, posts){
        if (err){
          console.log(err)
        } else {
          res.send(posts)
        }
      })
    }
  })
})
// 5) to handle deleting a comment from a post
app.delete('/posts/:id/comments/:comId', function(req, res){
  var post_id = req.params.id
  var comment_id = req.params.comId
  Post.findByIdAndUpdate(post_id, {$pull:{'comments':{_id:comment_id}}}, function(err, post){
    if (err){
      console.log(err)
    } else {
      Post.find({}).exec(function(err, posts){
        if (err){
          console.log(err)
        } else {
          res.send(posts)
        }
      })
    }
  })
  // Post.findById(req.params.id).exec(function(err, post){
  //   if(err){
  //     console.log(err)
  //   } else {
  //     console.log('test_____________________' + post + req.param.comId)
  //     post.comments.id(req.param.comId).remove();

  //   }
  // })
})

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
