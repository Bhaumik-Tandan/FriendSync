import React, { createContext, useContext, useState, useEffect } from "react";
import { getLocalStoreData, setLocalStoreData } from "../helper/localStorage";
import getUUID from "../helper/getUUID";
import saveImage from "../helper/saveImage";
import deleteImage from "../helper/deleteImage";
const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPeople = async () => {
      const people = await getLocalStoreData("people");
      setPeople(people);
    };
    getPeople();
  }, []);

  const handleAddPeople = async (newPeople) => {
    newPeople.map((person) => {
      person.id = getUUID();
    });
    const updatedPeople = people ? [...people, ...newPeople] : newPeople;
    setPeople(updatedPeople);
    await setLocalStoreData("people", updatedPeople);
  };

  const deletePerson = async (person) => {
    const updatedPeople = people.filter((p) => p.id !== person.id);
    setPeople(updatedPeople);
    await setLocalStoreData("people", updatedPeople);
    deleteImage(person.id);
  };

  const handleEditPerson = async (person,imageURI=null) => {
    const updatedPeople = people.map((p) => {
      if (p.id === person.id) {
        return person;
      }
      return p;
    });
    setPeople(updatedPeople);
    await setLocalStoreData("people", updatedPeople);
    if(imageURI)
    saveImage(imageURI,person.id);
  };

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        handleAddPeople,
        deletePerson,
        handleEditPerson,
        loading,
        setLoading,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => {
  return useContext(PeopleContext);
};
