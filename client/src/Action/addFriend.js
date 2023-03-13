import * as api from '../API/index'
import { fetchAllUsers } from './users';

export const addFriendAction = (_id, nameDetails) => async (dispatch) =>{

    try {
        await api.addFriend(_id, nameDetails);
        dispatch(fetchAllUsers())
    } catch (error) {
        console.log(error);
    }
}

export const acceptRequestAction = (obj, userDetails) => async (dispatch) =>{

    const {_id , userName} = obj;

    console.log({_id , userName});

    try {
        await api.acceptRequest(_id, {userDetails, userName});
        dispatch(fetchAllUsers())
    } catch (error) {
        console.log(error);
    }
}

export const removeRequestAction = (_id, userId) => async (dispatch) =>{

    try {
        await api.removeRequest(_id, userId);
        dispatch(fetchAllUsers())
    } catch (error) {
        console.log(error);
    }
}

export const removeFriendAction = (obj, Id) => async (dispatch) =>{

    const {_id , userId, friendObjId} = obj;

    try {
        await api.removeFriend(_id, {Id, userId, friendObjId});
        dispatch(fetchAllUsers())
    } catch (error) {
        console.log(error);
    }
}