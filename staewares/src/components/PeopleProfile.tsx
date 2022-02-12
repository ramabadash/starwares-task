import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Front-end routers

// types
import { PeopleObj } from '../@types/types';

// Context
import ApiContext from '../contexts/ApiContext';

// Style
import '../styles/PeopleProfile.css';

// ---------- PeopleProfile - COMPONENT ---------- //

function PeopleProfile() {
  const [profileData, setProfileData] = useState<PeopleObj | undefined>(undefined);
  const [name, setName] = useState(useParams().name);
  const { peopleData } = useContext(ApiContext);

  // ----- STATES ----- //
  const [homeWorldData, setHomeWorldData] = useState<string>('');
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [starships, setStarships] = useState<string[]>([]);
  const [films, setFilms] = useState<string[]>([]);
  const [species, setSpecies] = useState<string[]>([]);

  // ----- EFFECTS ----- //
  useEffect(() => {
    setProfileData(() => peopleData!.find((people: PeopleObj) => people.name === name));

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
      if (profileData) {
        const { data } = await axios.get(profileData.homeworld);
        setHomeWorldData(data.name);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Get persons vehicles
  const getVehicles = async () => {
    try {
      if (profileData) {
        for (const url of profileData.vehicles) {
          const { data } = await axios.get(url);
          setVehicles(prevVehicles => [...prevVehicles, data.name]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get persons films
  const getFilms = async () => {
    try {
      if (profileData) {
        for (const url of profileData.films) {
          const { data } = await axios.get(url);
          setFilms(prevFilms => [...prevFilms, data.title]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get persons starships
  const getStarships = async () => {
    try {
      if (profileData) {
        for (const url of profileData.starships) {
          const { data } = await axios.get(url);
          setStarships(prevStarships => [...prevStarships, data.name]);
        }
      }
    } catch (error) {}
  };

  // Get persons starships
  const getSpecies = async () => {
    try {
      if (profileData) {
        for (const url of profileData.species) {
          const { data } = await axios.get(url);
          setSpecies(prevSpecies => [...prevSpecies, data.name]);
        }
      }
    } catch (error) {}
  };

  // Navigate
  const navigate = useNavigate();

  return (
    <div>
      <button className='back-to-home' onClick={() => navigate('/')}>
        <i className='fa-solid fa-house'></i>
      </button>
      <div className='profile-container'>
        {profileData ? (
          <div>
            <h2>
              <i className='fa-solid fa-user'></i> Profile : {profileData.name}{' '}
            </h2>

            {/* Gender */}
            <h3>
              {profileData.gender}{' '}
              {profileData.gender === 'male' ? (
                <i className='fa-solid fa-mars'></i>
              ) : profileData.gender === 'female' ? (
                <i className='fa-solid fa-venus'></i>
              ) : (
                <i className='fa-solid fa-mars-and-venus'></i>
              )}
            </h3>

            <h3>Born in : {profileData.birth_year}</h3>
            {/* Body shape */}
            <div className='body-shape'>
              <h3>
                <i className='fa-solid fa-user-astronaut'></i> Body shape:
              </h3>
              <span className='profile-span'>
                {profileData.height} CM | {profileData.mass} KG
              </span>
              <span className='profile-span'>
                <i className='fa-solid fa-eye'></i> Eyes:{profileData.eye_color} |{' '}
                <i className='fa-solid fa-user'></i> {'  '}Hair: {profileData.hair_color} |{' '}
                <i className='fa-solid fa-hand-dots'></i> {'  '}Skin: {profileData.skin_color}
              </span>
            </div>

            {/* STAR WARES THINGS */}
            <div className='star-wares-things'>
              <h3>
                <i className='fa-solid fa-star'></i> Star Wares things:
              </h3>
              <p>
                <i className='fa-solid fa-earth-asia'></i> Home world:{' '}
                {homeWorldData.length ? homeWorldData : 'No homeworld'}
              </p>
              <p>
                <i className='fa-solid fa-rocket'></i> {'  '}Drive on:{' '}
                {vehicles.length ? vehicles.join(', ') : 'No vehicles'}
              </p>
              <p>Starships: {starships.length ? starships : 'No starships'}</p>
              <p>Species: {species.length ? species.join(' , ') : 'No species'}</p>
            </div>

            <div>
              <h3>
                <i className='fa-solid fa-video'></i> {'  '}From movies :{' '}
              </h3>
              {films.length > 0 ? films.join(' | ') : 'No movies'}
            </div>

            <p>
              Profile created at : {profileData.created}, Update at: {profileData.edited}{' '}
            </p>
          </div>
        ) : (
          <div>404 Not Found</div>
        )}
      </div>
    </div>
  );
}

export default PeopleProfile;
