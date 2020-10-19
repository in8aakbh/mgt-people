import * as React from 'react';
import styles from './People.module.scss';
import { IPeopleProps } from './IPeopleProps';
import { RequestsList } from './RequestsList/RequestsList';
import { IRequestProps } from '../../../common/IRequestProps';

export const People: React.FunctionComponent<IPeopleProps> = (props) => {
  const myItems: IRequestProps[] = [
    {
      Requests: 'Claim Request',
      RequestedBy: 'John Wick',
      RequestedOn: '15/09/2020',
      RequestSource: 'SAP',
      DueOn: '20/09/2020'
    },
    {
      Requests: 'Claim Request',
      RequestedBy: 'Aakash Bhardwaj',
      RequestedOn: '15/09/2020',
      RequestSource: 'SAP',
      DueOn: '20/09/2020'
    },
    {
      Requests: 'Leave Request',
      RequestedBy: 'John Wick',
      RequestedOn: '10/09/2020',
      RequestSource: 'SAP',
      DueOn: '15/09/2020'
    }
  ];

  return (
    <div className={styles.people}>
      <div className={styles.container}>
        <RequestsList items={myItems} />
      </div>
    </div>
  );
};
