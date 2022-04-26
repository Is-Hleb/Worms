import * as ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Route, Routes} from 'react-router';
import {GameComponent} from "./game/GameComponent";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<GameComponent/>}/>
      </Routes>
    </BrowserRouter>
);
