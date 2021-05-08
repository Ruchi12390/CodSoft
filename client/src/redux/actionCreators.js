import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

import {
    SET_DATA_SUCCESS,
    SET_DATA_BLANK,
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILED,
    POST_DATA_REQUEST,
    POST_DATA_SUCCESS,
    POST_DATA_FAILED,
    UPDATE_DATA_REQUEST,
    UPDATE_DATA_SUCCESS,
    UPDATE_DATA_FAILED,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILED,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILED,
    RENDER_PREVIEW_SUCCESS
} from './actionTypes'

export const loginCheck = (user, callback) => {
    return (dispatch) => {
        dispatch(logInRequest())

        axios({
            url: 'http://localhost:3000/api/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(user)
        })
            .then(response => {
                const data = response.data
                dispatch(logInSuccess(data.token))
                callback()
            })
            .catch(error => {
                dispatch(logInFailure(error.message))
            })
    }
}

export const logInRequest = () => {
    return {
        type: LOG_IN_REQUEST,
    }
}

export const logInSuccess = token => {
    return {
        type: LOG_IN_SUCCESS,
        payload: token
    }
}

export const logInFailure = () => {
    return {
        type: LOG_IN_FAILED,
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(logOutRequest())
        dispatch(logOutSuccess())
    }
}

export const logOutRequest = () => {
    return {
        type: LOG_OUT_REQUEST,
    }
}

export const logOutSuccess = token => {
    return {
        type: LOG_OUT_SUCCESS,
        payload: null
    }
}

export const logOutFailure = () => {
    return {
        type: LOG_OUT_FAILED,
    }
}

export const setData = (index, callback) => {
    return (dispatch) => {
        if (index === -1)
            dispatch(setDataBlank(index))
        else dispatch(setDataSuccess(index))
        callback()
    }
}

export const setDataSuccess = index => {
    return {
        type: SET_DATA_SUCCESS,
        payload: index
    }
}


export const setDataBlank = index => {
    return {
        type: SET_DATA_BLANK,
        payload: index
    }
}

export const fetchData = (token, callback) => {
    var user;
    if (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        user = JSON.parse(window.atob(base64));
    }
    else {
        user = {};
    }

    return (dispatch) => {
        dispatch(fetchDataRequest())

        axios.get(`http://localhost:3000/api/dashboard/resume/all/${user.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
            .then(response => {
                const data = response.data
                dispatch(fetchDataSuccess(data.data))
                callback()
            })
            .catch(error => {
                dispatch(fetchDataFailure(error.message))
            })
    }
}

export const fetchDataRequest = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
}

export const fetchDataSuccess = data => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data
    }
}

export const fetchDataFailure = error => {
    return {
        type: FETCH_DATA_FAILED,
        payload: error
    }
}

export const postData = (token, resume) => {
    console.log(token);

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    const user = JSON.parse(window.atob(base64));

    const bodyData = {
        data: resume,
        user: user
    }

    return (dispatch) => {
        dispatch(postDataRequest())

        axios({
            url: 'http://localhost:3000/api/dashboard/resume',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            data: JSON.stringify(bodyData)
        })
            .then(response => {
                const data = response.data
                dispatch(postDataSuccess(data.data))
            })
            .catch(error => {
                dispatch(postDataFailure(error.message))
            })
    }
}

export const postDataRequest = () => {
    return {
        type: POST_DATA_REQUEST
    }
}

export const postDataSuccess = data => {
    return {
        type: POST_DATA_SUCCESS,
        payload: data
    }
}

export const postDataFailure = error => {
    return {
        type: POST_DATA_FAILED,
        payload: error
    }
}

export const updateData = (token, resume) => {

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    const user = JSON.parse(window.atob(base64));

    const bodyData = {
        data: resume,
        user: user
    }
    console.log(token);

    return (dispatch) => {
        dispatch(updateDataRequest())

        axios({
            url: `http://localhost:3000/api/dashboard/resume/${resume._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            data: JSON.stringify(bodyData)
        })
            .then(response => {
                const data = response.data
                console.log(data.data);
                dispatch(updateDataSuccess(data.data))
            })
            .catch(error => {
                dispatch(updateDataFailure(error.message))
            })
    }
}

export const updateDataRequest = () => {
    return {
        type: UPDATE_DATA_REQUEST
    }
}

export const updateDataSuccess = data => {
    return {
        type: UPDATE_DATA_SUCCESS,
        payload: data
    }
}

export const updateDataFailure = error => {
    return {
        type: UPDATE_DATA_FAILED,
        payload: error
    }
}

export const renderPreview = () => {
    return (dispatch) => {
        html2canvas(document.querySelector("#template")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            dispatch(renderPreviewSuccess(imgData))
        });
    }
}

export const renderPreviewSuccess = image => {
    return {
        type: RENDER_PREVIEW_SUCCESS,
        payload: image
    }
}

export const generatePdf = (img) => {
    return () => {
        const pdf = new jsPDF();
        console.log(img)
        pdf.addImage(img, 'PNG', 0, 0);
        pdf.save("resume.pdf");
    }
}
/*
export const generatePdfSuccess = image => {
    return {
        type: Generate_SUCCESS
    }
}
*/
