import React, {useState, useEffect} from 'react'
import axios from 'axios';

function MatchesDisplay({matches}) {
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
  console.log(matchedProfiles);

  useEffect(() => {
    if (matches) {
      getMatches();
    }
  }, []);

  return (
    <div className="matches-display">
        
        
    </div>
  )
}

export default MatchesDisplay