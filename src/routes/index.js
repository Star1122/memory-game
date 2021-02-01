import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Landing from 'containers/Landing';
import ScoreBoard from 'containers/ScoreBoard';
import GameBoard from 'containers/GameBoard';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/game-board" component={GameBoard} />
      <Route exact path="/score-board" component={ScoreBoard} />

      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
