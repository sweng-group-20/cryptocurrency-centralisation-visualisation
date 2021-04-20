import React from 'react';
import Linkify from 'react-linkify';
import { string } from 'prop-types';
import './DataSource.css';

function DataSource({ dataSource }) {
  return (
    <Linkify>
      <div className="data-source">Data source: {dataSource}</div>
    </Linkify>
  );
}

DataSource.propTypes = { dataSource: string };
DataSource.defaultProps = { dataSource: '' };

export default DataSource;
