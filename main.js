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

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  $.guid=0;
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

  var _findCommentById = function (id) {
    for (var i = 0; i < posts.comments.length; i += 1) {
      if (posts.comments[i].id === id) {
        return posts.comments[i];
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
    var comment = {
      text:text,
      id: guid()
    }

    post.comments.push(comment)
    // var findId = function(){
    //   return id;
    // }
    console.log(post.comments)

  }

  var getCommentsHtml = function (currentPost) {
    if (currentPost.comments.length>0){ 
    for (let i = 0 ; i < currentPost.comments.length; i++) {
        // var curCom = currentPost.comments[i]
      var commentsContainer =  '<li class="comment" id="'+currentPost.comments[i].id+'"><button type="button" class="btn btn-danger btn-xs remove-comment">X</button>'+currentPost.comments[i].text+'</li>'

  }
    return commentsContainer
  } else {
    return '<li> Comment Here!</li>'
  }
}

var removeComment = function(currentPost){
  //i want the function to remove the comment from the comments array and then rerender the whole comment section
  //$(this).siblings().remove()
  var $clickedPost = $(currentPost).closest('.post');
  var id = $clickedPost.data().id;
  var post = _findPostById(id);

  var $clickedComment = $(currentPost).closest('.comment');
  var commId = $clickedComment.data().id;
  var comment = _findCommentById(commId)
    // var actualP = $(currentPost).closest('.post');
    for (let i = 0 ; i < comment.length; i++){
      console.log(comment[i].id)
    }       
}


  //   var getCommentsHtml = function () {
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

    for (let post of posts) {

      let commentsContainer = `<div class='comments'>
        <input type="text" class="comment-name">
        <button class="btn btn-primary add-comment">Post Comment</button>
        <ul id="${post.id}">${getCommentsHtml(post)}</ul> </div>`;

      let htmlPost = '<div class="post" data-id=' + post.id + '>'
      + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
      commentsContainer + '</div>';

      $posts.append(htmlPost);

       
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
    getCommentsHtml: getCommentsHtml,
    // posts: posts,

    // TODO: Implement
     removeComment: removeComment,
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
  var currP = $(this).closest('.post')
  var text = $(currP).find($(".comment-name")).val()
  app.createComment(this, text);
  app.renderPosts(this);
})

$(".posts").on('click', '.remove-comment', function() {
  app.removeComment(this);
  app.renderPosts(this)
})