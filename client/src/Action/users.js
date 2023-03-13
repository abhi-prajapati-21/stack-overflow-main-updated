import *as api from '../API'

export const fetchAllUsers = () => async (dispatch) => {

    try {
        const { data } = await api.fetchAllUsers()
        dispatch({ type: 'FETCH_USERS', payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const updatedProfile = (id, updateData) => async (dispatch) => {
     
    try {
        const { data } = await api.updateProfile(id, updateData)
        dispatch({type: 'UPDATE_CURRENT_USER', payload: data})
    } catch (error) {
        console.log(error);
    }
}
