const TawhooStats = ({ tawhoos }) => {
  const caculateStats = (tawhoos) => {
    let noTag = tawhoos.filter((t) => !t.tags || t.tags.length === 0);
    let mostPopularTags = {};
    tawhoos.forEach((t) => {
      if (t.tags || t?.tags?.length > 0) {
        t.tags.forEach((tag) => {
          if (mostPopularTags[tag]) {
            mostPopularTags[tag] += 1;
          } else {
            mostPopularTags[tag] = 1;
          }
        });
      }
    });
    var sortable = [];
    for (let popularTag in mostPopularTags) {
      sortable.push([popularTag, mostPopularTags[popularTag]]);
    }

    console.log(sortable);
    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });
    return { noTag: noTag.length, mostPopularTag: sortable };
  };
  return (
    <div>
      {tawhoos ? (
        <div>
          <div>{tawhoos.length} tawhoo van az adatbázisban.</div>
          <div>{caculateStats(tawhoos).noTag} tawhoonak nincs kategóriája.</div>
          <div>
            Legnépszerűbb kategóriák:{" "}
            {caculateStats(tawhoos).mostPopularTag[0][0]} -{" "}
            {caculateStats(tawhoos).mostPopularTag[0][1]},{" "}
            {caculateStats(tawhoos).mostPopularTag[1][0]} -{" "}
            {caculateStats(tawhoos).mostPopularTag[1][1]},{" "}
            {caculateStats(tawhoos).mostPopularTag[2][0]} -{" "}
            {caculateStats(tawhoos).mostPopularTag[2][1]}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TawhooStats;
