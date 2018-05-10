import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js'; 
import postApi from './postsApi.js'; 

let PostApi = new postApi();
let postsRenderer = new PostsRenderer();
let postsRepository = new PostsRepository(PostApi);
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);

postsRepository.initData().then(()=>{
    postsRenderer.renderPosts(postsRepository.posts)
})
eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();

export default {PostApi, postsRepository, postsRenderer}