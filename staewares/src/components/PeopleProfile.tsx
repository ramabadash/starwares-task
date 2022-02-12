import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Front-end routers

// types
import { PeopleObj } from '../@types/types';

// ---------- PeopleProfile - COMPONENT ---------- //

function PeopleProfile({ profileData }: { profileData: PeopleObj }) {
  // ----- STATES ----- //
  const [homeWorldData, setHomeWorldData] = useState<string>('');
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [starships, setStarships] = useState<string[]>([]);
  const [films, setFilms] = useState<string[]>([]);
  const [species, setSpecies] = useState<string[]>([]);

  // ----- EFFECTS ----- //
  useEffect(() => {
    if (profileData) {
      getHomeworld();
      getVehicles();
      getStarships();
      getFilms();
      getSpecies();
    }
  }, [profileData]);

  // ----- FUNCTIONS ----- //
  // Get persons homeworld
  const getHomeworld = async () => {
    try {
      const { data } = await axios.get(profileData.homeworld);
      setHomeWorldData(data.name);
    } catch (error) {
      console.log(error);
    }
  };
  // Get persons vehicles
  const getVehicles = async () => {
    try {
      for (const url of profileData.vehicles) {
        const { data } = await axios.get(url);
        setVehicles(prevVehicles => [...prevVehicles, data.name]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get persons films
  const getFilms = async () => {
    try {
      for (const url of profileData.films) {
        const { data } = await axios.get(url);
        setFilms(prevFilms => [...prevFilms, data.title]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get persons starships
  const getStarships = async () => {
    try {
      for (const url of profileData.starships) {
        const { data } = await axios.get(url);
        setStarships(prevStarships => [...prevStarships, data.name]);
      }
    } catch (error) {}
  };

  // Get persons starships
  const getSpecies = async () => {
    try {
      for (const url of profileData.species) {
        const { data } = await axios.get(url);
        setSpecies(prevSpecies => [...prevSpecies, data.name]);
      }
    } catch (error) {}
  };

  // Navigate
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/')}>Back to home page</button>
      {profileData ? (
        <div>
          <h2>{profileData.name} Profile</h2>
          <h3>From movies : {films}</h3>
          <h3>{profileData.gender}</h3>
          <h3>Born in : {profileData.birth_year}</h3>
          <h3>Body shape:</h3>
          <p>
            {profileData.height} CM | {profileData.mass} KG |
          </p>
          <p>
            Eyes:{profileData.eye_color} | Hair: {profileData.hair_color} | Skin:{' '}
            {profileData.skin_color}
          </p>

          <h3>Star Wares things:</h3>
          <p>Home world: {homeWorldData.length ? homeWorldData : 'No homeworld'}</p>
          <p>Drive on: {vehicles.length ? vehicles : 'No vehicles'}</p>
          <p>Starships: {starships.length ? starships : 'No starships'}</p>
          <p>Species: {species.length ? species : 'No species'}</p>

          <p>
            Profile created at : {profileData.created}, Update at: {profileData.edited}{' '}
          </p>
        </div>
      ) : (
        <div>404 Not Found</div>
      )}
    </div>
  );
}

export default PeopleProfile;
