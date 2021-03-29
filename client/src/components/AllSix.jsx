import React from 'react';
import './AllSix.css';
import '../index.css';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import LineGraph from './LineGraph';
import PieChart from './PieChart';
// import NetworkSmallGraph from './NetworkSmallGraph';

// sample data below from Nivo website
const lineData = [
  {
    id: 'japan',
    color: 'hsl(309, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 235,
      },
      {
        x: 'helicopter',
        y: 232,
      },
      {
        x: 'boat',
        y: 115,
      },
      {
        x: 'train',
        y: 157,
      },
      {
        x: 'subway',
        y: 158,
      },
      {
        x: 'bus',
        y: 178,
      },
      {
        x: 'car',
        y: 4,
      },
      {
        x: 'moto',
        y: 274,
      },
      {
        x: 'bicycle',
        y: 76,
      },
      {
        x: 'horse',
        y: 24,
      },
      {
        x: 'skateboard',
        y: 69,
      },
      {
        x: 'others',
        y: 290,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(124, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 251,
      },
      {
        x: 'helicopter',
        y: 199,
      },
      {
        x: 'boat',
        y: 220,
      },
      {
        x: 'train',
        y: 228,
      },
      {
        x: 'subway',
        y: 114,
      },
      {
        x: 'bus',
        y: 54,
      },
      {
        x: 'car',
        y: 255,
      },
      {
        x: 'moto',
        y: 20,
      },
      {
        x: 'bicycle',
        y: 4,
      },
      {
        x: 'horse',
        y: 96,
      },
      {
        x: 'skateboard',
        y: 28,
      },
      {
        x: 'others',
        y: 276,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(228, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 108,
      },
      {
        x: 'helicopter',
        y: 6,
      },
      {
        x: 'boat',
        y: 256,
      },
      {
        x: 'train',
        y: 272,
      },
      {
        x: 'subway',
        y: 0,
      },
      {
        x: 'bus',
        y: 54,
      },
      {
        x: 'car',
        y: 107,
      },
      {
        x: 'moto',
        y: 288,
      },
      {
        x: 'bicycle',
        y: 135,
      },
      {
        x: 'horse',
        y: 294,
      },
      {
        x: 'skateboard',
        y: 173,
      },
      {
        x: 'others',
        y: 154,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(221, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 48,
      },
      {
        x: 'helicopter',
        y: 254,
      },
      {
        x: 'boat',
        y: 199,
      },
      {
        x: 'train',
        y: 275,
      },
      {
        x: 'subway',
        y: 248,
      },
      {
        x: 'bus',
        y: 240,
      },
      {
        x: 'car',
        y: 179,
      },
      {
        x: 'moto',
        y: 3,
      },
      {
        x: 'bicycle',
        y: 180,
      },
      {
        x: 'horse',
        y: 25,
      },
      {
        x: 'skateboard',
        y: 88,
      },
      {
        x: 'others',
        y: 163,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(136, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 113,
      },
      {
        x: 'helicopter',
        y: 10,
      },
      {
        x: 'boat',
        y: 282,
      },
      {
        x: 'train',
        y: 33,
      },
      {
        x: 'subway',
        y: 186,
      },
      {
        x: 'bus',
        y: 100,
      },
      {
        x: 'car',
        y: 88,
      },
      {
        x: 'moto',
        y: 273,
      },
      {
        x: 'bicycle',
        y: 27,
      },
      {
        x: 'horse',
        y: 183,
      },
      {
        x: 'skateboard',
        y: 149,
      },
      {
        x: 'others',
        y: 202,
      },
    ],
  },
];

const pieData = [
  {
    id: 'rust',
    label: 'rust',
    value: 24,
    color: 'hsl(2, 70%, 50%)',
  },
  {
    id: 'erlang',
    label: 'erlang',
    value: 506,
    color: 'hsl(58, 70%, 50%)',
  },
  {
    id: 'lisp',
    label: 'lisp',
    value: 309,
    color: 'hsl(160, 70%, 50%)',
  },
  {
    id: 'sass',
    label: 'sass',
    value: 233,
    color: 'hsl(171, 70%, 50%)',
  },
  {
    id: 'hack',
    label: 'hack',
    value: 560,
    color: 'hsl(273, 70%, 50%)',
  },
];

function AllSix({ name }) {
  const { url } = useRouteMatch();
  return (
    <section className="AllSix">
      <Link to={`${url}/Application`}>
        <div className="graph Application">
          <LineGraph data={lineData} />
          Application
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${url}/Consensus`}>
        <div className="graph Consensus">
          <PieChart data={pieData} />
          Consensus
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${url}/Incentive`}>
        <div className="graph Incentive">
          Incentive
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${url}/Operational`}>
        <div className="graph Operational">
          <LineGraph data={lineData} />
          Operational
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${url}/Network`}>
        <div className="graph Network">
          Network
          <br />
          {name}
        </div>
      </Link>
      <Link to={`${url}/Governance`}>
        <div className="graph Governance">
          <PieChart data={pieData} />
          Governance
          <br />
          {name}
        </div>
      </Link>
    </section>
  );
}

AllSix.propTypes = {
  name: PropTypes.string,
};
AllSix.defaultProps = { name: '' };

export default AllSix;
