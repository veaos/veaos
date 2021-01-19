import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import { withLayout } from './components/Layout/Layout';

import { QuestionsRoute } from './routes/questions/Questions';
import { QuestionRoute } from './routes/question/Question';
import { AskQuestionRoute } from './routes/ask-question/AskQuestion';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { LoginRoute } from './routes/authentication/Login';
import { EditPostRoute } from './routes/editPost/EditPost';
import { useAuth } from './context/AuthContext';
import { SearchRoute } from './routes/search/Search';

function App() {
  const history = useHistory();
  const { isAuthenticated } = useAuth();

  history.listen((location, action) => {
    if (action === 'PUSH') {
      window.scrollTo(0, 0);
    }
  });

  return (
    <div className="min-h-screen flex">
      <Switch>
        {!isAuthenticated && (
          <Route
            exact
            path="/account/login"
            component={withLayout(LoginRoute, false)}
          />
        )}
        <ProtectedRoute
          exact
          path="/account/logout"
          component={() => {
            location.href = process.env.REACT_APP_API_URL + '/auth/logout';
            return <div />;
          }}
        />
        <ProtectedRoute
          exact
          path="/question/ask"
          component={withLayout(AskQuestionRoute)}
        />
        <ProtectedRoute
          path="/question/:id"
          component={withLayout(QuestionRoute)}
        />
        <ProtectedRoute
          path="/post/:id/edit"
          component={withLayout(EditPostRoute)}
        />
        <ProtectedRoute
          exact
          path="/search"
          component={withLayout(SearchRoute)}
        />
        <ProtectedRoute exact path="/" component={withLayout(QuestionsRoute)} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
