import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie';

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
            <div key={_index} className="match-card" onClick={() => setClickedUser(match)}>
              <div className="img-container">
                <img src={match?.img_url} alt="profile pic"/>
              </div>
              <p>{match.first_name}</p>
            </div>
          )
        })}
        
    </div>
  )
}

export default MatchesDisplay