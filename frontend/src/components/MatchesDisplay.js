import React, {useState, useEffect} from 'react'
import axios from 'axios';

function MatchesDisplay({matches, setClickedUser}) {
  const [matchedProfiles, setMatchedProfiles] = useState(null);

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
  console.log("matched profiles: ", matchedProfiles);

  useEffect(() => {
    if (matches) {
      getMatches();
    }
  }, []);

  return (
    <div className="matches-display">
        {matchedProfiles?.map((match, _index) => {
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