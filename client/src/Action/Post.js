import * as api from '../API/index'

export const uploadMediaAction = (currentUserID, formData) => async (dispatch) => {

    try {
        await api.uploadMedia(currentUserID, formData);
    } catch (error) {
        console.log(error);
    }
}

export const postCommentAction = (_id, comment) => async (dispatch) => {

    try {
        await api.postComment(_id, comment);
        dispatch(fetchAllPosts())
    } catch (error) {
        console.log(error);
    }
}

export const postLikeAction = (_id, value) => async (dispatch) => {

    try {
        await api.postLike(_id, value);
        dispatch(fetchAllPosts())
    } catch (error) {
        console.log(error);
    }
}

export const fetchAllPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchAllPosts();
        dispatch({type: 'FETCH_POSTS', payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const deletePostAction = (_id) => async (dispatch) => {
      
 try {
     await api.deletePost(_id);
     dispatch(fetchAllPosts());
 } catch (error) {
     console.log(error);
 }
}
