import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import App from './App';
import generateStore from './redux/Store';

const store = generateStore()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch