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

function renderPosts(){
    $(".posts").find('p').remove();
    $(".posts").find('form').remove();
    for (let i=0; i<posts.length; i++){
    $('.posts').append('<p class="post" data-id='+i+'>'+'<button type="button" class="remove btn btn-danger" data-id='+i+'>X</button>'+posts[i].text+'<form id="form1"><input id="userC" type="text" placeholder="Your Name"/><input id="commentTxt" type="text" placeholder="Your Text"/><button type="button" class="subCom btn-xs btn-success">submit</button></form><div class="comments"></div></p>')
    }
}

$(".add-post").on('click', function(){
    makePost(posts.length + 1);
    renderPosts();
})

//all posts will get comments
$('.posts').on('click', '.subCom', function(){

    $('.comments').append('<p>'+$("#userC").val()+' : ' + $("#commentTxt").val()+'</p>')
})

$(".posts").on("click", ".remove", function () {
    var position = $(this).attr("data-id");
    posts.splice(position, 1);
    renderPosts();
})


