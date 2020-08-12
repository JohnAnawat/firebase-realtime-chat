import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'

import Lobby from '../page/lobby'

export default () => (

  <Switch>
    <Suspense>
      <Route exact path="/" component={Lobby} />
    </Suspense>
  </Switch>
)