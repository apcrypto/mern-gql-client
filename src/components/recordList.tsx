import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_RECORDS } from '../graphql/queries/records';
import { DELETE_RECORD } from '../graphql/mutations/deleteRecord';

interface RecordProps {
  record: Record;
}

type Record = {
  id: string;
  name: string;
  position: string;
  level: string;
};

const Record: React.FC<RecordProps> = ({ record }) => (
  <tr>
    <td>{record.name}</td>
    <td>{record.position}</td>
    <td>{record.level}</td>
    <td>
      <Link
        className="btn btn-link"
        to={`/edit/${record.id}`}
        state={{ record }}
      >
        Edit
      </Link>{' '}
      |
      <DeleteRecord id={record.id} />
    </td>
  </tr>
);

interface DeleteRecordProps {
  id: string;
}

const DeleteRecord: React.FC<DeleteRecordProps> = ({ id }) => {
  const [deleteRecord, { data, loading, error }] = useMutation(DELETE_RECORD, {
    variables: { id },
    refetchQueries: [GET_RECORDS, 'GetRecords'],
  });

  if (loading) return <span>Deleting...</span>;
  if (error) return <span>Delete error! {error.message}</span>;

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

export const RecordList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_RECORDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

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
          {data?.records.map((record: Record) => (
            <Record record={record} key={record.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
