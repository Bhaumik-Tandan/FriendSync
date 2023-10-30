import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLocalStoreData,setLocalStoreData } from '../helper/localStorage';

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
        const updatedPeople = people? [...people,...newPeople]:newPeople;
        setPeople(updatedPeople);
        await setLocalStoreData('people',updatedPeople);
      };

    return (
        <PeopleContext.Provider
            value={{
                people,
                setPeople,
                handleAddPeople,
            }}
        >
            {children}
        </PeopleContext.Provider>
    );
};

export const usePeople = () => {
    return useContext(PeopleContext);
};
