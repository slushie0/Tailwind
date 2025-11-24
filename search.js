let data = {};
Papa.parse("airport-codes.csv", {
  download: true,
  header: true,
  complete: function (results) {
    data = results.data.map(element => ({ ident: element.ident, type: element.type, name: element.name, municipality: element.municipality }))
    console.log(`Loaded ${data.length} aerodromes`);
  }
});

function search() {
  let query = document.querySelector("#query");
  let searchResults = document.querySelector("#search-results");
  searchResults.innerHTML = "";
  if (query.value.length < 1) {
    return;
  }
  let regex = new RegExp(query.value, 'i');
  let newdata = data.filter((item) => Object.values(item).find((value) => regex.test(value)));
  newdata.sort((a, b) => sizeOrder[a.type] - sizeOrder[b.type]);

  //newdata = newdata.slice(0, 20);
  for (let i = 0; i < 20; i++) {
    if (newdata.length <= i) { return; }
    console.log(newdata[i].type);
    let ident = newdata[i].ident;
    let name = newdata[i].name;
    let municipality = newdata[i].municipality;
    let item = document.createElement("a");
    item.innerHTML = '<span>' + ident + '</span> - <span>' + name + '</span> - <span>' + municipality + '</span>';
    item.className = "list-group-item list-group-item-action";
    item.href = "#";
    item.onclick = () => {
      query.value = ident;
      getMetar();
    }
    searchResults.appendChild(item);
  }
}
