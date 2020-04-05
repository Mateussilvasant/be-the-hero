import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Logon from './Logon';
import Register from './Register';
import Profile from './Profile';
import NewIncident from './NewIncident';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/cadastrar" component={Register} />
                <Route path="/perfil" component={Profile}/>
                <Route path="/incidentes/criar" component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}