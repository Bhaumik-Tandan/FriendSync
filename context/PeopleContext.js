import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLocalStoreData,setLocalStoreData } from '../helper/localStorage';
import getUUID from '../helper/getUUID';

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {

    const [people, setPeople] = useState([]); 

    useEffect(() => {
        const getPeople = async () => {
            const people = await getLocalStoreData('people');
            setPeople(people);
        };
        getPeople();
    }, []);

    const handleAddPeople = async (newPeople) => {
        newPeople.map((person)=>{
            person.id = getUUID();
        });
        const updatedPeople = people? [...people,...newPeople]:newPeople;
        setPeople(updatedPeople);
        await setLocalStoreData('people',updatedPeople);
      };

    const deletePerson = async (person) => {
        const updatedPeople = people.filter((p) => p.id !== person.id);
        setPeople(updatedPeople);
        await setLocalStoreData('people',updatedPeople);
    };

    return (
        <PeopleContext.Provider
            value={{
                people,
                setPeople,
                handleAddPeople,
                deletePerson,
            }}
        >
            {children}
        </PeopleContext.Provider>
    );
};

export const usePeople = () => {
    return useContext(PeopleContext);
};
