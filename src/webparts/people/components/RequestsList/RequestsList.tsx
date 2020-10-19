import * as React from 'react';
import { useState } from 'react';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { DetailsList, buildColumns, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Person } from '@microsoft/mgt-react';
import { PersonViewType } from '@microsoft/mgt';
import { IRequestsListProps } from './IRequestsListProps';
import styles from '../People.module.scss';
import { IRequestProps } from '../../../../common/IRequestProps';

export const RequestsList: React.FunctionComponent<IRequestsListProps> = (props) => {
  let allItems: IRequestProps[] = props.items;
  const [sortedItems, updateSortedItems] = useState<IRequestProps[]>(props.items);
  const [columns, updateColumns] = useState<IColumn[]>(buildRequestColumns(props.items));

  const onColumnClick = (event: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    let isSortedDescending = column.isSortedDescending;

    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    allItems = copyAndSort(sortedItems, column.fieldName!, isSortedDescending);
    updateSortedItems(allItems);
    updateColumns(columns.map(col => {
      col.isSorted = col.key === column.key;

      if (col.isSorted) {
        col.isSortedDescending = isSortedDescending;
      }

      return col;
    }));
  };

  function copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  }

  function buildRequestColumns(items: any[]): IColumn[] {
    let columns = buildColumns(items, true);
    columns.forEach(col => { col.name = col.name.split(/(?=[A-Z])/).join(' '); col.maxWidth = 300; });

    return columns.filter(col => col.key !== 'Approver');
  }

  const renderItemColumn = (item: any, index: number, column: IColumn) => {
    const fieldContent = item[column.fieldName as keyof any] as string;

    switch (column.key) {
      case 'RequestSource':
        return (
          <div className={styles.requestSource}>
            <div><Image src='https://placehold.it/32x32' width={20} height={20} imageFit={ImageFit.cover} /></div>
            <div className={styles.requestSourceText}>{fieldContent}</div>
          </div>
        );

      case 'RequestedBy':
        return (
          <div className={styles.description}>
            <Person personQuery={fieldContent}
              view={PersonViewType.oneline}
            />
          </div>
        );

      default:
        return <span>{fieldContent}</span>;
    }
  };

  return (
    <div className={styles.people}>
      <div className={styles.container}>
        <DetailsList
          items={sortedItems}
          setKey="set"
          columns={columns}
          onRenderItemColumn={renderItemColumn}
          onColumnHeaderClick={onColumnClick}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="Row checkbox"
        />
      </div>
    </div>
  );
};
