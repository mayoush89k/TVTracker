import { createContext, useContext, useEffect, useState } from "react";

export const ShowListContext = createContext();
export const useShowList = () => useContext(ShowListContext);

export const ShowListProvider = ({ children }) => {
  const [showList, setShowList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toView, setToView] = useState(localStorage.getItem("toView"));
  const url = "https://tvtracker.onrender.com/shows/";

  useEffect(() => {
    toViewList();
  }, [toView]);

  const getAll = () => fetchGetAllShowLists();
  const fetchGetAllShowLists = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setShowList(data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      setError(error);
      setLoading(false);
    }
  };

  // add new show item
  const addNewShowList = (newShowList) => fetchCreatingNewShowItem(newShowList);
  const fetchCreatingNewShowItem = async (newShowList) => {
    try {
      setLoading(true);
      console.log("newShowList: ", newShowList);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShowList),
      });
      console.log("response: ", response);

      setShowList([...showList, response.data]);
      setLoading(false);
      toViewList();
      return response.data;
    } catch (error) {
      setError(error);
    }
  };

  // delete item from show list
  const deleteShowItem = (id) => fetchDeletingShowItem(id);
  const fetchDeletingShowItem = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}${id}`, {
        method: "DELETE",
      });
      setShowList(showList.filter((item) => item.id !== id));

      setLoading(false);
      await toViewList();
    } catch (error) {
      setError(error);
    }
  };

  // increasing Episode
  const increaseEpisode = (id, episode) =>
    fetchUpdatingEpisode(id, episode + 1);

  // Decreasing Episode
  const decreaseEpisode = (id, episode) =>
    fetchUpdatingEpisode(id, episode - 1);
  const fetchUpdatingEpisode = async (id, episode) => {
    console.log(episode);
    try {
      setLoading(true);
      const response = await fetch(`${url}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ episode: episode }),
      });
      setShowList(
        showList.map((item) =>
          item._id === id ? { ...item, episode: episode } : item
        )
      );
      setLoading(false);
      toViewList();
      return response.data;
    } catch (error) {
      setError(error);
    }
  };

  // increasing Season
  const increaseSeason = (id, season) => fetchUpdatingSeason(id, season + 1);

  // Decreasing Season
  const decreaseSeason = (id, season) => fetchUpdatingSeason(id, season - 1);
  const fetchUpdatingSeason = async (id, season) => {
    console.log(season);
    try {
      setLoading(true);
      const response = await fetch(`${url}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ season: season }),
      });
      setShowList(
        showList.map((item) =>
          item._id === id ? { ...item, season: season } : item
        )
      );
      setLoading(false);
      toViewList();
      return response.data;
    } catch (error) {
      setError(error);
    }
  };

  // changing Complete between true and false
  const updateIsComplete = (id, isCompleted) =>
    fetchUpdatingIsComplete(id, isCompleted ? false : true);

  const fetchUpdatingIsComplete = async (id, isCompleted) => {
    console.log(isCompleted);
    try {
      setLoading(true);
      const response = await fetch(`${url}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: isCompleted }),
      });
      console.log(response);
      setShowList(
        showList.map((item) =>
          item._id === id ? { ...item, isCompleted: isCompleted } : item
        )
      );
      console.log(setShowList);
      setLoading(false);
      await getAll();
      return response.data;
    } catch (error) {
      setError(error);
    }
  };

  const toViewList = () => {
    setToView(localStorage.getItem("toView"));
    console.log(toView);
    switch (toView) {
      case "Completed":
        fetchCompletedShowList();
        break;
      case "InComplete":
        fetchInCompleteShowList();
        break;
      case "InProgress":
        fetchInProgressShowList();
        break;
      case "ToWatch":
        fetchToWatchShowList();
        break;

      default:
        fetchGetAllShowLists();
        break;
    }
  };

  // get all the data that has IsCompleted = true /?Completed=true"
  const fetchCompletedShowList = async () => {
    try {
      setLoading(true);
      const response = await fetch(url + "?Completed=true");
      const data = await response.json();
      setShowList(data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      setError(error);
      setLoading(false);
    }
  };

  // get all the data that has IsCompleted = false /?Completed=false"
  const fetchInCompleteShowList = async () => {
    console.log("incomplete");
    try {
      setLoading(true);
      const response = await fetch(url + "?Completed=false");
      const data = await response.json();
      setShowList(data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      setError(error);
      setLoading(false);
    }
  };
  // get all the data that are watching"
  const fetchInProgressShowList = async () => {
    console.log("in progress");
    try {
      setLoading(true);
      const response = await fetch(url + "?Completed=false");
      const data = await response.json();
      const newData = data.filter((item) => item.episode > 0);
      setShowList(newData);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      setLoading(true);
      setError(error);
    }
  };
  // get all the data that has been started"
  const fetchToWatchShowList = async () => {
    console.log("to watch");
    try {
      setLoading(true);
      const response = await fetch(url + "?Completed=false");
      const data = await response.json();
      const newData = data.filter((item) => item.episode == 0);
      setShowList(newData);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      setLoading(true);
      setError(error);
    }
  };

  return (
    <ShowListContext.Provider
      value={{
        showList,
        loading,
        error,
        setError,
        setToView,
        addNewShowList,
        toViewList,
        getAll,
        deleteShowItem,
        increaseEpisode,
        decreaseEpisode,
        increaseSeason,
        decreaseSeason,
        updateIsComplete,
      }}
    >
      {children}
    </ShowListContext.Provider>
  );
};
