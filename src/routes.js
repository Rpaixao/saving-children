import React from 'react';
import { Route } from 'react-router';

import App from './components/app';
import AddForm from './components/situations/add';
import ListOfProblems from './components/situations/list';
import ProblemShow from './components/situations/problem_show';

export default (
    <Route path="/" component={App} >
        <Route path="problems" component={ListOfProblems}/>
        <Route path="problems/add" component={AddForm}/>
        <Route path="problems/:id" component={ProblemShow}/>
    </Route>
);

