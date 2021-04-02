// import React, { useState, useEffect } from 'react';
// import classnames from 'classnames';
// // import ResponsiveLineCanvas from '../components/ResponsiveLineCanvas';
// import ResponsiveChoropleth from '../components/GeoMap';

// // ResponsiveGeoMap,
// // ResponsiveGeoMapCanvas,

// const GraphPage = () => {
//   const [bitcoinSC, setBitcoinSC] = useState([]);
//   const [bitcoinRCC, setBitcoinRCC] = useState([]);
//   const [ethereumSC, setEthereumSC] = useState([]);
//   const [ethereumRCC, setEthereumRCC] = useState([]);
//   const [bitcoinGeo, setBitcoinGeo] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const bitcoinSCResp = await fetch(
//         'http://localhost:4000/api/v1/bitcoin/operational/storage-constraint',
//         { method: 'GET' }
//       );
//       const bitcoinSCJson = await bitcoinSCResp.json();
//       const { data: bitcoinSCData } = bitcoinSCJson;
//       setBitcoinSC(bitcoinSCData);

//       const bitcoinRCCResp = await fetch(
//         'http://localhost:4000/api/v1/bitcoin/application/reference-client-concentration',
//         { method: 'GET' }
//       );
//       const bitcoinRCCJson = await bitcoinRCCResp.json();
//       const { data: bitcoinRCCData } = bitcoinRCCJson;
//       setBitcoinRCC(bitcoinRCCData);

//       const ethereumSCResp = await fetch(
//         'http://localhost:4000/api/v1/ethereum/operational/storage-constraint',
//         { method: 'GET' }
//       );
//       const ethereumSCJson = await ethereumSCResp.json();
//       const { data: ethereumSCData } = ethereumSCJson;
//       setEthereumSC(ethereumSCData);

//       const ethereumRCCResp = await fetch(
//         'http://localhost:4000/api/v1/ethereum/application/reference-client-concentration',
//         { method: 'GET' }
//       );
//       const ethereumRCCJson = await ethereumRCCResp.json();
//       const { data: ethereumRCCData } = ethereumRCCJson;
//       setEthereumRCC(ethereumRCCData);
//       const bitcoinGeoResp = await fetch(
//         'http://localhost:4000/api/v1/bitcoin/network/geographical-distribution',
//         { method: 'GET' }
//       );
//       const bitcoinGeoJson = await bitcoinGeoResp.json();
//       const { data: bitcoinGeoData } = bitcoinGeoJson;
//       setBitcoinGeo(bitcoinGeoData);
//     })();
//   }, [
//     setBitcoinSC,
//     setBitcoinRCC,
//     setEthereumSC,
//     setEthereumRCC,
//     setBitcoinGeo,
//   ]);

//   return (
//     <div>
//       <div className={classnames('w-screen', 'h-screen')}>
//         <ResponsiveLineCanvas
//           data={bitcoinSC}
//           xAxisLabel="Time"
//           yAxisLabel="Ratio of Growth"
//         />
//         <div className={classnames('w-screen', 'h-screen')}>
//           <ResponsiveLineCanvas
//             data={bitcoinRCC}
//             xAxisLabel="Time"
//             yAxisLabel="Satoshi Index"
//           />
//         </div>
//         <div className={classnames('w-screen', 'h-screen')}>
//           <ResponsiveLineCanvas
//             data={ethereumSC}
//             xAxisLabel="Time"
//             yAxisLabel="Ratio of Growth"
//           />
//         </div>
//         <div className={classnames('w-screen', 'h-screen')}>
//           <ResponsiveLineCanvas
//             data={ethereumRCC}
//             xAxisLabel="Time"
//             yAxisLabel="Satoshi Index"
//           />
//         </div>
//         <ResponsiveChoropleth data={bitcoinGeo} />
//       </div>
//       <hr />
//     </div>
//   );
// };

// export default GraphPage;
