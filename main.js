var SpacebookApp = function () {
  var posts = [
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]}
  ];

  // the current id to assign to a post
  var currentId = 0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
    }

    currentId += 1;

    posts.push(post);
  }

  var createComment = function (currentPost, text) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;
    var post = _findPostById(id);
    posts[posts.indexOf(post)].comments.push(text)
    var findId = function(){
      return id;
    }
    console.log(posts[posts.indexOf(post)].comments)
  }

  var renderComments = function (currentPost) {
    findId();
    // var $clickedPost = $(currentPost).closest('.post');
    // var id = $clickedPost.data().id;
    var post = _findPostById(id);
    $(".comDiv").empty();
    for (let i = 0; i < posts.length; i++) {
      for (let j = 0; j < posts[i].comments.length; j++) {

        var commentsContainer = '<div class="comDiv"><li>' + posts[i].comments[j] + '</li> </div>';
        $(currentPost).siblings('#' + id).append(commentsContainer)

      }
    }
  }

  //   var renderComments = function () {
  //       $('.commentsContainer').empty();
  //       for (let i=0; i<posts.length; i++){
  //           for (let j=0; j<posts[i].comments.length; j++){
  //           var com = posts[i].comments[j]
  //             //   var commentsContainer = '<div class="comments">' +
  //             //    '<input type="text" class="comment-name">' +
  //             //    '<button class="btn btn-primary add-comment">Post Comment</button>' + posts[i].comments[j] + '</div>';
  //           $posts.append('<div class="comments">' +
  //           '<input type="text" class="comment-name">' +
  //           '<button class="btn btn-primary add-comment">Post Comment</button>' + posts[i].comments[j] + '</div>')
  //       }
  //     }
  //   }

  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments">' +
        '<input type="text" class="comment-name">' +
        '<button class="btn btn-primary add-comment">Post Comment</button>' +
        '<ul id="' + post.id + '"></ul> </div>';

      $posts.append('<div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
        renderComments(post);
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments').toggleClass('show');
  }

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,

    // TODO: Implement
    createComment: createComment,

    // TODO: Implement
    renderComments: renderComments,
    posts: posts,

    // TODO: Implement
    // removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

$(".posts").on('click', '.add-comment', function () {
  var text = $(this).siblings($(".comment-name")).val()
  app.createComment(this, text);
  // app.renderComments(this);
})