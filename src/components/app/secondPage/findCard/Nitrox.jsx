const Nitrox = ({ facilities }) => {
  const hasWifi = facilities.some(
    (facility) => facility.toLowerCase() === "nitrox"
  );
  return (
    <div>
      <h1 className="text-[#0080ff] text-[14px] md:text-[25px] font-outfit">
        <span className="font-[700] sm:font-[500]">Nitrox:</span>{" "}
        {hasWifi ? "Available" : "Unavailable"}
      </h1>
    </div>
  );
};

export default Nitrox;
