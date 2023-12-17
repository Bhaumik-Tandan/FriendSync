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

  const handleAddPeople = async (newPeople,images=[]) => {
    for(let i=0;i<newPeople.length;i++)
    {
      const id=getUUID();
      const image=images.at(i);
      newPeople[i].id=id;
      if(image){
        saveImage(image,id);
        newPeople[i].image=id;
        }
    }

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
    if(imageURI){
    if(!imageURI.includes(person.id))
    await saveImage(imageURI,person.id);
    person.image=person.id;
    }
    else{
      deleteImage(person.id);
      person.image=null;
    }
    const updatedPeople = people.map((p) => {
      if (p.id === person.id) {
        return person;
      }
      return p;
    });
    setPeople(updatedPeople);
    await setLocalStoreData("people", updatedPeople);
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
