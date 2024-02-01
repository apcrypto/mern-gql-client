import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_RECORDS } from '../graphql/queries/records';
import { DELETE_RECORD } from '../graphql/mutations/deleteRecord';

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.level}</td>
    <td>
      <Link
        className="btn btn-link"
        to={`/edit/${props.record.id}`}
        state={{ props }}
      >
        Edit
      </Link>{' '}
      |
      <DeleteRecord id={props.record.id} />
    </td>
  </tr>
);

const DeleteRecord = ({ id }) => {
  const [deleteRecord, { data, loading, error }] = useMutation(DELETE_RECORD, {
    variables: { id },
    refetchQueries: [GET_RECORDS, 'GetRecords'],
  });

  if (loading) return 'Deleting...';
  if (error) return `Delete error! ${error.message}`;

  return (
    <button
      className="btn btn-link"
      onClick={() => {
        deleteRecord({ variables: { id } });
      }}
    >
      Delete
    </button>
  );
};

export const RecordList = () => {
  const { loading, error, data } = useQuery(GET_RECORDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.records.map((record) => (
            <Record record={record} key={record.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
