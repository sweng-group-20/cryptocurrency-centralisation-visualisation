import countries from './world_countries.json';
import legendItems from './LegendItems';

function formatNumNodes(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function setCountryColour(i) {
  const legendItem = legendItems.find((legendItemInner) =>
    legendItemInner.isFor(countries.features[i].properties.numNodes)
  );
  if (legendItem != null) {
    countries.features[i].properties.colour = legendItem.color;
  }
}

class setCountryData {
  constructor(cryptoData) {
    this.cryptoData = cryptoData;
  }

  sortData() {
    let i;
    let j;
    const { features } = countries;
    for (i = 0; i < countries.features.length; i += 1) {
      for (j = 0; j < this.cryptoData.data.length; j += 1) {
        if (countries.features[i].id === this.cryptoData.data[i].id) {
          features[i].properties.numNodes = this.cryptoData.data[i].value;
          features[i].properties.numNodesString = formatNumNodes(
            this.cryptoData.data[i].value
          );
        }
        setCountryColour(i);
      }
    }
    console.log(countries.features);
  }
}

export default setCountryData;
