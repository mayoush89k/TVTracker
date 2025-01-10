import { createContext, useContext, useState } from "react";

export const ShowListContext = createContext();
export const useShowList = () => useContext(ShowListContext);

export const ShowListProvider = ({ children }) => {
  const [showList, setShowList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const url = "http://localhost:3434/shows/";

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
      await fetchGetAllShowLists();
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
      await fetchGetAllShowLists();
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
      await fetchGetAllShowLists();
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
      await fetchGetAllShowLists();
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
      await fetchGetAllShowLists();
      return response.data;
    } catch (error) {
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
        addNewShowList,
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
