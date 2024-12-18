export const addNewHobby = (hobby) =>{
    return{
        type: 'ADD_HOOBY',
        payload: hobby,
    }
}

export const setActiveHobby = (hobby) =>{
    return{
        type: 'SET_ACTIVE_HOBBY',
        payload: hobby,
    }
}