import "./App.css";
import { ShowListProvider} from "./context/ShowListContext.jsx";
import ShowsList from "./Components/ShowsList.jsx";
import AddShow from "./Components/AddShow.jsx";


function App() {


  return (
    <>
      <main>
        <ShowListProvider>
          <AddShow/>
          <ShowsList/>
        </ShowListProvider>
      </main>
    </>
  );
}

export default App;
