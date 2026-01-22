const getLevelFromPoints = (points) => {
  if (points >= 4000) return { level: 5, name: "Money Mentor" };
  if (points >= 2000) return { level: 4, name: "Strategist" };
  if (points >= 1000) return { level: 3, name: "Builder" };
  if (points >= 300) return { level: 2, name: "Saver" };
  return { level: 1, name: "Beginner" };
};

module.exports = { getLevelFromPoints };
