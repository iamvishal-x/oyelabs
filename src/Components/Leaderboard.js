import { useCustomContext } from "../context";
import { useState, useEffect } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [customContext] = useCustomContext();

  useEffect(() => {
    /**
     *
     */
    const cocktailEntriesMap = customContext.entries.reduce((map, entry) => {
      if (!map[entry.cocktail])
        return {
          ...map,
          [entry.cocktail]: [entry],
        };

      return {
        ...map,
        [entry.cocktail]: [...map[entry.cocktail], entry],
      };
    }, {});

    const cocktailLeaderboardMap = Object.entries(cocktailEntriesMap).reduce(
      (map, [cocktail, entries]) => ({
        ...map,
        [cocktail]: entries.reduce((sum, entry) => sum + entry.points, 0),
      }),
      {}
    );

    const leaderboard = Object.entries(cocktailLeaderboardMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    setLeaderboard(leaderboard);
  }, [customContext.entries]);

  return (
    <div>
      <div className="right__leaderboard">
        {leaderboard.map(([cocktail, points], index) => (
          <div className="right__leaderboard__item">
            #{index + 1} {cocktail} ({points})
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
