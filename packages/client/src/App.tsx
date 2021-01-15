import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';

import { QuestionsRoute } from './routes/questions/Questions';
import { QuestionRoute } from './routes/question/Question';
import { AskQuestionRoute } from './routes/askQuestion/AskQuestion';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { LoginRoute } from './routes/Authentication/Login';

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
      <Layout isAuthenticated={isAuthenticated}>
        <Switch>
          <Route exact path="/account/login" component={LoginRoute} />
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
            component={AskQuestionRoute}
          />
          <ProtectedRoute path="/question/:id" component={QuestionRoute} />
          <ProtectedRoute path="/" component={QuestionsRoute} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
