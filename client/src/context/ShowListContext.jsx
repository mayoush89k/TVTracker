import { createContext, useContext, useEffect, useState } from "react";
import ShowsList from "../Components/ShowsList";

export const ShowListContext = createContext();
export const useShowList = () => useContext(ShowListContext);

export const ShowListProvider = ({ children }) => {
  const [showList, setShowList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");
  const [newShowError, setNewShowError] = useState("");
  const [newShowLoading, setNewShowLoading] = useState("");
  const [editError, setEditError] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [toView, setToView] = useState(localStorage.getItem("toView"));
  const [yearsList, setYearsList] = useState([]);
  const [year, setYear] = useState(localStorage.getItem("filterYear"));
  const [filterYear, setFilterYear] = useState(0);

  const url = "https://tvtracker.onrender.com/shows/";
  // const url = "http://localhost:3434/shows/";

  useEffect(() => {
    setLoading(true) 
  }, []);

  useEffect(() => {
    toViewList();
    fetchYears();
    setFilterYear(localStorage.setItem("filterYear" , year))
  }, [toView, year]);

  // this function is for checking which list to be shown
  const toViewList = async () => {
    setToView(localStorage.getItem("toView"));
    setListLoading(true);
    console.log(toView);
    switch (toView) {
      case "Completed":
        await fetchCompletedShowList();
        break;
      case "InComplete":
        await fetchInCompleteShowList();
        break;
      case "InProgress":
        await fetchInProgressShowList();
        break;
      case "ToWatch":
        await fetchToWatchShowList();
        break;
      case "All":
        await fetchGetAllShowLists();
        break;
      default:
        await fetchGetAllShowLists();
        break;
    }
    setTimeout(() => {
      setListLoading(false)
    }, 1000);
    setLoading(false);
  };

  const getAll = () => fetchGetAllShowLists();
  const fetchGetAllShowLists = async () => {
    try {
      const response = await fetch(
        Number(year) == 0 ? url : url + "?year=" + year
      );
      const data = await response.json();
      setShowList(data);
    } catch (error) {
      setError(error);
    }
  };

  // add new show item
  const addNewShowList = (newShowList) => fetchCreatingNewShowItem(newShowList);
  const fetchCreatingNewShowItem = async (newShowList) => {
    try {
      setNewShowLoading(true);
      setNewShowError("");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShowList),
      });
      setShowList([...showList, response.data]);

      if (response.status != 400)
        response.status == 409
          ? setNewShowError("Conflict Item")
          : setNewShowError("There is an Error to Add this Show");

      setNewShowLoading(false);
      toViewList();
      return response.data;
    } catch (newShowError) {
      setNewShowError(newShowError);
    }
  };

  // delete item from show list
  const deleteShowItem = (id) => fetchDeletingShowItem(id);
  const fetchDeletingShowItem = async (id) => {
    try {
      const response = await fetch(`${url}${id}`, {
        method: "DELETE",
      });
      setShowList(showList.filter((item) => item.id !== id));
      toViewList();
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
    try {
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
    try {
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
    try {
      const response = await fetch(`${url}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: isCompleted }),
      });

      setShowList(
        showList.map((item) =>
          item._id === id ? { ...item, isCompleted: isCompleted } : item
        )
      );
      localStorage.setItem("toView", "All");
      toViewList();
      return response.data;
    } catch (error) {
      setError(error);
    }
  };

  // get all the data that has IsCompleted = true /?Completed=true"
  const fetchCompletedShowList = async () => {
    try {
      const response =
        year > 0
          ? await fetch(url + "?Completed=true&year=" + year)
          : await fetch(url + "?Completed=true");
      const data = await response.json();
      console.log("data fetchCompletedShowList: ", data);
      setShowList(data);
    } catch (error) {
      setError(error);
    }
  };

  // get all the data that has IsCompleted = false /?Completed=false"
  const fetchInCompleteShowList = async () => {
    try {
      const response =
        year > 0
          ? await fetch(url + "?Completed=false&year=" + year)
          : await fetch(url + "?Completed=false");
      const data = await response.json();
      setShowList(data);
    } catch (error) {
      setError(error);
    }
  };
  // get all the data that are watching"
  const fetchInProgressShowList = async () => {
    try {
      const response =
        year > 0
          ? await fetch(url + "?Completed=false&year=" + year)
          : await fetch(url + "?Completed=false");
      const data = await response.json();
      const newData = data.filter((item) => item.episode > 0);
      setShowList(newData);
    } catch (error) {
      setError(error);
    }
  };
  // get all the data that has been started"
  const fetchToWatchShowList = async () => {
    try {
      const response =
        year > 0
          ? await fetch(url + "?Completed=false&year=" + year)
          : await fetch(url + "?Completed=false");
      const data = await response.json();
      const newData = data.filter((item) => item.episode == 0);
      setShowList(newData);
    } catch (error) {
      setError(error);
    }
  };

  // editing the show requests and response
  const editShowData = (item) => fetchEditShowItem(item);
  const fetchEditShowItem = async (item) => {
    try {
      setEditLoading(true);
      const response = await fetch(url + item._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item }),
      });
      const data = await response.json();
      console.log(data);
      toViewList();
      setEditLoading(false);
    } catch (editError) {
      setEditError(editError);
      setEditLoading(false);
    }
  };

  // get the list of years
  const fetchYears = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const years = data.filter((item) => item.year > 0);
      const filteredYears = years.reduce((acc, item) => {
        if (!acc.includes(item.year)) acc.push(item.year);
        return acc;
      }, []);
      setYearsList(filteredYears.sort((a, b) => a - b));
    } catch (error) {
      setError(error);
    }
  };

  // get list by search
  const ListBySearch = (text) => fetchSearchForShow(text);
  const fetchSearchForShow = async (text) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const filteredList = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setShowList(filteredList);
    } catch (error) {
      setError(error);
    }
  };

  //  re-watch means that will start the episodes from the beginning and that will move the show to inProgress
  const reWatchShow = (item) => fetchReWatchShow(item);
  const fetchReWatchShow = async (item) => {
    try {
      const response = await fetch(url + "" + item._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          isCompleted: false,
          episode: 0,
        }),
      });
      const data = await response.json();
      toViewList();
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
        listLoading,
        setError,
        setToView,
        newShowError,
        newShowLoading,
        setNewShowError,
        addNewShowList,
        toViewList,
        getAll,
        deleteShowItem,
        increaseEpisode,
        decreaseEpisode,
        increaseSeason,
        decreaseSeason,
        updateIsComplete,
        editError,
        editLoading,
        editShowData,
        yearsList,
        year,
        setYear,
        ListBySearch,
        reWatchShow
      }}
    >
      {children}
    </ShowListContext.Provider>
  );
};
