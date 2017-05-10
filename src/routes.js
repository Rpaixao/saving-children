import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import AddForm from './components/situations/add';
import ListOfProblems from './components/situations/list';
import MapProblems from './components/situations/map-problems';
import ProblemShow from './components/situations/problem_show';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={ListOfProblems}/>
        <Route path="problems" component={ListOfProblems}/>
        <Route path="map" component={MapProblems}/>
        <Route path="problems/add" component={AddForm}/>
        <Route path="problems/:id" component={ProblemShow}/>
    </Route>
);

