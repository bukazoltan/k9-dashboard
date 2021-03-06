const Search = ({ onChange }) => {
  return (
    <div>
      <input
        className="SearchInput"
        type="text"
        onChange={(e) => onChange(e)}
        placeholder="Keresés a tawhook közt..."
      />
    </div>
  );
};

export default Search;
