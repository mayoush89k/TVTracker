import "./App.css";
import { ShowListProvider} from "./context/ShowListContext.jsx";
import ShowsList from "./Components/ShowsList.jsx";
import AddShow from "./Components/AddShow.jsx";


function App() {


  return (
    <>
      <main>
        <ShowListProvider>
          <ShowsList/>
          <AddShow/>
        </ShowListProvider>
      </main>
    </>
  );
}

export default App;
