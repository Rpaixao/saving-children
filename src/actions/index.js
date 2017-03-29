import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAvoZQxHY_BtvglcNjwjLYl5Ybv0tck1L4",
    authDomain: "form-app-cf168.firebaseapp.com",
    databaseURL: "https://form-app-cf168.firebaseio.com",
    storageBucket: "form-app-cf168.appspot.com",
    messagingSenderId: "762516291461"
};

const fb = firebase
    .initializeApp(config)
    .database()
    .ref();

export const ADD_PROBLEM = 'ADD_PROBLEM';
export const CLOSE_PROBLEM = 'CLOSE_PROBLEM';
export const GET_PROBLEMS = 'GET_PROBLEMS';
export const GET_PROBLEM = 'GET_PROBLEM';
export const UNLOAD_SELECTED_PROBLEM = 'UNLOAD_SELECTED_PROBLEM';

export function addProblem(props){

    const request = fb.child('situations').push(props);

    return {
        type: ADD_PROBLEM,
        payload: request
    };
}

export function closeProblem(problem){

    problem.status = 'C';
    const request = fb.child('situations/' + problem.key).set(problem);

    return {
        type: CLOSE_PROBLEM,
        payload: request
    };
}

export function unloadSelectedProblem() {
    return {
        type: UNLOAD_SELECTED_PROBLEM
    };
}

export function getProblems(){

    return function (dispatch) {
        fb.database.ref('situations').once('value').then((response) => {

            var data = [];
            response.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();

                childData.key = key;
                data.push(childData);
            });

            dispatch(getProblemsHandleResponse(data));
        })
        .catch((error) => {
            console.log('[E] [GER_PROBLEMS] ' + error);
            dispatch(getProblemsHandleResponse(null));
        });
    }
}

export function getProblem(problemKey){

    return function (dispatch) {
        fb.database.ref('situations/' + problemKey).once('value').then((response) => {
            var problem = response.val();
            problem.key = problemKey;
            dispatch(getProblemHandleResponse(problem));
        })
        .catch((error) => {
            console.log('[E] [GET_PROBLEM] ' + error);
            dispatch(getProblemsHandleResponse());
        });
    }
}

export function getProblemHandleResponse (response = {key:'-1'}) {
    return {
        type: GET_PROBLEM,
        payload: response
    };
}

export function getProblemsHandleResponse (response = {}) {
    return {
        type: GET_PROBLEMS,
        payload: response
    };
}