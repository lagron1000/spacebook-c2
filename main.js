let posts = [];
function makePost(postId){
    let post = {
        text: $("#post-name").val(),
        id: postId,
        comments: []
    }
    posts.push(post)
    console.log(posts)  
}

function makeComment(){
    let comment ={
        user: $('#userC').val(),
        commentCon: $('#commentTxt').val()
    }
    for (let i=0; i<posts.length; i++){
    posts[i].comments.user = $('#userC').val(),
    posts[i].comments.commentCon = $('#commentTxt').val()
    console.log(posts[i].comments)
    }
}

function renderPosts(){
    $(".posts").find('p').remove();
    $(".posts").find('form').remove();
    for (let i=0; i<posts.length; i++){
    $('.posts').append('<p class="spost" data-id='+i+'>'+'<button type="button" class="remove btn btn-danger btn-xs" data-id='+i+'>X</button>'+posts[i].text+'<div class="comments"><form id="form1"><input id="userC" type="text" placeholder="Your Name"/><input id="commentTxt" type="text" placeholder="Your Text"/><button type="button" class="subCom btn-xs btn-success">submit</button></form></div></p>')
   /*
    $('.comments').append('<p>')
    */
    }
}

$(".add-post").on('click', function(){
    makePost(posts.length + 1);
    renderPosts();
})

//all posts will get comments
$('.posts').on('click', '.subCom', function(){
    makeComment();
    for (let i=0; i<posts.length; i++){


    $(this).parent().append('<p>'+posts[i].comments.user+' : ' + posts[i].comments.commentCon+'</p>')

    }

})

$(".posts").on("click", ".remove", function () {
    var position = $(this).attr("data-id");
    posts.splice(position, 1);
    renderPosts();
})


