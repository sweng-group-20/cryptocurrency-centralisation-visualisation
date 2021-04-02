// import React from 'react';
// import { Link, useRouteMatch } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import LineGraph from './LineGraph';
// // import PieChart from './PieChart';
// import ResponsiveChoropleth from './GeoMap';
// import './AllSix.css';
// import '../index.css';

// function AllSix({ applicationData }) {
//   const { url } = useRouteMatch();
//   return (
//     <section className="AllSix">
//       <Link to={`${url}/Application`}>
//         <div className="graph Application">
//           <h3 className="link">Application</h3>
//           <LineGraph data={applicationData} smallGraph />
//         </div>
//       </Link>
//       <Link to={`${url}/Consensus`}>
//         <div className="graph Consensus">
//           <h3 className="link">Consensus</h3>
//           {/* <PieChart data={pieData} smallGraph /> */}
//         </div>
//       </Link>
//       <Link to={`${url}/Incentive`}>
//         <div className="graph Incentive">
//           <h3 className="link">Incentive</h3>
//           {/* <PieChart data={pieData} smallGraph /> */}
//         </div>
//       </Link>
//       <Link to={`${url}/Operational`}>
//         <div className="graph Operational">
//           <h3 className="link">Operational</h3>
//           {/* <LineGraph data={lineData} smallGraph /> */}
//         </div>
//       </Link>
//       <Link to={`${url}/Network`}>
//         <div className="graph Network">
//           <h3 className="link">Network</h3>
//           <div className="visual">
//             <ResponsiveChoropleth />
//           </div>
//         </div>
//       </Link>
//       <Link to={`${url}/Governance`}>
//         <div className="graph Governance">
//           <h3 className="link">Governance</h3>
//           {/* <PieChart data={pieData} smallGraph /> */}
//         </div>
//       </Link>
//     </section>
//   );
// }

// AllSix.propTypes = {
//   applicationData: PropTypes.string,
// };
// AllSix.defaultProps = { applicationData: '' };

// // AllSix.propTypes = {
// //   lineData: PropTypes.string,
// //   pieData: PropTypes.string,
// // };
// // AllSix.defaultProps = { lineData: '', pieData: '' };

// export default AllSix;
