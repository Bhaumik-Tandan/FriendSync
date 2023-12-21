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

  
    const multiDelete = async (peopleToDeleteIds) => {
      // Retrieve the corresponding person objects for the IDs to be deleted
      const peopleToDelete = people.filter((person) => peopleToDeleteIds.includes(person.id));
    
      // Update the state and local storage with the filtered list (excluding the deleted people)
      const updatedPeople = people.filter((person) => !peopleToDeleteIds.includes(person.id));
      setPeople(updatedPeople);
      await setLocalStoreData("people", updatedPeople);
    
      // Delete images for the selected people (if needed)
      for (const person of peopleToDelete) {
        try {
          await deleteImage(person.id);
        } catch (error) {
          // Handle any errors that occur during image deletion (e.g., image not found)
          // console.error(`Error deleting image for person with ID ${person.id}: ${error.message}`);
        }
      }
    };
    
    
  

  const handleEditPerson = async (person,imageURI=null) => {
    if(imageURI){
    if(!imageURI.includes(person.id)){
    
    await saveImage(imageURI,person.id);
    person.updateId=getUUID();
  }
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
        multiDelete
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => {
  return useContext(PeopleContext);
};
