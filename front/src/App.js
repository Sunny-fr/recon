import React from 'react';
import ApplicationLayout from './layout/application/ApplicationLayout'
import router from './config/router'


function App() {
  return (
    <ApplicationLayout>
        {router}
    </ApplicationLayout>
  );
}

export default App;
