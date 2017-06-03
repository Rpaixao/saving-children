import * as firebase from 'firebase';
import axios from 'axios';

import CypherQueries from '../utils/cypher-queries/queries'

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
export const GET_TOTAL_BY_COUNTRY = 'GET_TOTAL_BY_COUNTRY';
export const UNLOAD_SELECTED_PROBLEM = 'UNLOAD_SELECTED_PROBLEM';
export const SELECT_COUNTRY ='SELECT_COUNTRY';

const ROOT_URL = 'http://app65849072-i17QUs:b.XEjVtvCclJH2.8zhm9Bl1lr5v9Y9Q@hobby-fkcobejmojekgbkeknflegpl.dbs.graphenedb.com:24789/db/data/cypher';
//const ROOT_URL = 'http://neo4j:nosql@localhost:7474/db/data/cypher';

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

export function selectCountry(country) {

    return {
        type: SELECT_COUNTRY,
        selectedCountry: country
    };
}

export function getProblems(country, term){

    alert(term);

    return function (dispatch) {

        var query;
        let params = {};

        if(!term){
            query = CypherQueries.getChildrenListQuery();
            params = {
                query: query,
                params: {
                    countryName: country
                }
            };
        } else {
            query = CypherQueries.getChildrenListByAgeQuery(term);
            params = {
                query: query,
                params: {
                    age: term,
                    countryName: country
                }
            };
        }

        var config = {
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json'
            },
            auth: {
                username: 'app65849072-i17QUs',
                password: 'b.XEjVtvCclJH2.8zhm9Bl1lr5v9Y9Q'
            },
        };

        return axios.post(ROOT_URL, params, config)
            .then(function (response) {
                dispatch(getProblemsHandleResponse(response.data.data));
            })
            .catch(function (error) {
                console.log("ERROR");
                console.log(error);
            });
    }
}

export function getTotalChildrenByCountry(term){

    console.log(term);

    return function (dispatch) {

        var query;
        let params = {};

        if(!term){
          query = CypherQueries.getTotalChildrenByCountry();
          params = {
            query: query,
          };
        } else {
          query = CypherQueries.getTotalChildrenByAgeGroupByCountry(term);
            params = {
                query: query,
                params: {
                    age: term
                }
            };
        }

        var config = {
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json'
            },
            auth: {
                username: 'app65849072-i17QUs',
                password: 'b.XEjVtvCclJH2.8zhm9Bl1lr5v9Y9Q'
            },
        };

        return axios.post(ROOT_URL, params, config)
            .then(function (response) {
                dispatch(getTotalChildrenByCountryHandleResponse(response.data.data));
            })
            .catch(function (error) {
                console.log("ERROR");
                console.log(error);
            });
    }
}

export function getProblem(childrenID){

    /*return function (dispatch) {
        fb.database.ref('situations/' + problemKey).once('value').then((response) => {
            var problem = response.val();
            problem.key = problemKey;
            dispatch(getProblemHandleResponse(problem));
        })
        .catch((error) => {
            console.log('[E] [GET_PROBLEM] ' + error);
            dispatch(getProblemsHandleResponse());
        });
    }*/

    return function (dispatch) {

        let query = CypherQueries.getChildrenQuery();

        let params = {
            query: query,
            params: {
                childrenID: parseInt(childrenID)
            }
        };

        var config = {
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json'
            },
            auth: {
                username: 'app65849072-i17QUs',
                password: 'b.XEjVtvCclJH2.8zhm9Bl1lr5v9Y9Q'
            },
        };

        return axios.post(ROOT_URL, params, config)
            .then(function (response) {
                dispatch(getProblemHandleResponse(response.data.data));
            })
            .catch(function (error) {
                console.log("ERROR");
                console.log(error);
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

export function getTotalChildrenByCountryHandleResponse (response = {}) {
    return {
        type: GET_TOTAL_BY_COUNTRY,
        payload: response
    };
}