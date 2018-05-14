    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
class PostsRepository {
    constructor(postApi) {
        this.posts = [];
        this.postApi = postApi;
        // this.postsRenderer = postsRenderer;
        console.log(postApi)
        // this.initData();
        // this.postApi.fetch(thisPostRep)
    }

    initData(){
        return this.postApi.fetch().then((data)=>{
            this.posts = data
        })
    }

    addPost(postText, postImage) {
        var newPost = { text: postText, image: postImage};
        return this.postApi.post(newPost).then((newPost)=>{
            this.posts.push(newPost)
        })
    }

    removePost(id) {
        return this.postApi.delete(id).then((data)=>{
            this.posts = data
        })
        // this.posts.splice(index, 1);
    }
    
    addComment(newComment, postId) {
        return this.postApi.postCom(newComment, postId).then((data)=>{
            this.posts = data
        })
        // this.posts[postIndex].comments.push(newComment);
    };

    deleteComment(postId, comId) {
        return this.postApi.deleteCom(postId, comId).then((data)=>{
            this.posts = data
        })
        // this.posts[postIndex].comments.splice(commentIndex, 1);
      };
}

export default PostsRepository