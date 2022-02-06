export const colorText = (word) => {
  const colors = {
    0: "#f3ff0b",
    1: "#ffbb16",
    2: "#1be7ff",
    3: "#5dff6b",
  };

  return word.split("").map((char, i) => {
    const random = Math.floor(Math.random() * 4);
    return (
      <span key={i} style={{ color: colors[random] }}>
        {char}
      </span>
    );
  });
};
