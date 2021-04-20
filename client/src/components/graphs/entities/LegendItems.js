import LegendItem from './LegendItem';

const legendItems = [
  new LegendItem('800+', '#2ce0ce', (numNodes) => numNodes >= 800),
  new LegendItem(
    '500 - 799',
    '#99ebff',
    (numNodes) => numNodes < 800 && numNodes >= 500
  ),
  new LegendItem(
    '300 - 499',
    '#ffd480',
    (numNodes) => numNodes < 500 && numNodes >= 300
  ),
  new LegendItem(
    '100 - 299',
    '#ffa366',
    (numNodes) => numNodes < 300 && numNodes >= 100
  ),
  new LegendItem(
    '50 - 99',
    '#ff751a',
    (numNodes) => numNodes < 100 && numNodes >= 50
  ),
  new LegendItem(
    '1 - 50',
    '#ff3333',
    (numNodes) => numNodes < 50 && numNodes > 0
  ),
  new LegendItem('No Data', '#7a7878', () => true),
];

export default legendItems;

/*
#2ce0ce // turquoise (lots of nodes)
#99ebff // cyan (mejum nodes)
#ffd480 // yellow (slightly less than mejum nodes)
#ffa366 // light orange (slightly more than some nodes) - could remove this
#ff751a // orange (some nodes)
#ff3333 // red (no/v few nodes)
#7a7878 // grey - no data
*/
