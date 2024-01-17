import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { FaTrash } from 'react-icons/fa';


function MatchesDisplay({matches, setClickedUser}) {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const userId = cookies.UserId;

  const matchedUserIds = matches.map(({user_id}) => user_id);

  const getMatches = async () => {
    try {
      const res = await axios.get('http://localhost:8000/users', {
        params: { userIds: JSON.stringify(matchedUserIds) }
      });
      setMatchedProfiles(res.data);
    } catch (err) {
      console.log(err);
  }
}
  const deleteMatch = async (matchId) => {
    try {
      const res = await axios.delete(`http://localhost:8000/matches/${userId}/${matchId}`);
      console.log(res.data);

      setMatchedProfiles((prevMatches) => prevMatches.filter((match) => match.user_id !== matchId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (matches) {
      getMatches();
    }
  }, [matches]);

  const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile) => 
      matchedProfile.matches.filter((profile) => profile.user_id === userId).length > 0
  ).sort((a, b) => a.first_name.localeCompare(b.first_name));
  return (
    <div className="matches-display">
        {filteredMatchedProfiles?.map((match, _index) => {
          return (
            <div key={match.user_id} className="match-card">
              <div className="img-container" onClick={() => setClickedUser(match)}>
                <img src={match?.img_url} alt="profile pic"/>
              </div>
              <p>{match.first_name}</p>
              <div className="delete-match-icon">
                <FaTrash onClick={() => deleteMatch(match.user_id)} />
              </div>
            </div>
          )
        })}
        
    </div>
  )
}

export default MatchesDisplay