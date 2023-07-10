import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { Entity } from '../types/entity.ts';

import { ListEntities } from './ListEntities.tsx';

describe('ListEntities', () => {
  const entities: Entity[] = [
    {
      id: '1',
      label: 'Entity 1',
      createdtime: '2022-01-01T00:00:00Z',
      description: 'Description 1',
      assigned_user_id: '19x234',
      source: 'Source 1',
      tags: [],
      modifiedtime: '2022-01-01T00:00:00Z',
      starred: false,
    },
    {
      id: '2',
      label: 'Entity 2',
      createdtime: '2022-01-02T00:00:00Z',
      description: 'Description 2',
      assigned_user_id: '19x554',
      source: 'Source 2',
      tags: [],
      modifiedtime: '2022-01-01T00:00:00Z',
      starred: false,
    },
  ];
  const headerExtractor = (entity: Entity) => entity.assigned_user_id;
  const statusExtractor = (entity: Entity) => entity.source;

  test('should render entities with default structure', () => {
    const view = render(
      <ListEntities
        entities={entities}
        headerExtractor={headerExtractor}
        statusExtractor={statusExtractor}
      />
    );

    const entity1Header = screen.getByText('Entity 1');
    const entity2Header = screen.getByText('Entity 2');
    const entity1Status = screen.getByText('Source 1');
    const entity2Status = screen.getByText('Source 2');
    const entity1Assign = screen.getByText('19x234');
    const entity2Assign = screen.getByText('19x554');

    expect(entity1Header).toBeInTheDocument();
    expect(entity2Header).toBeInTheDocument();
    expect(entity1Status).toBeInTheDocument();
    expect(entity2Status).toBeInTheDocument();
    expect(entity1Assign).toBeInTheDocument();
    expect(entity2Assign).toBeInTheDocument();

    view.unmount();
  });
  test('renders custom entities using the renderEntity prop', () => {
    const customRenderEntity = (entity: Entity) => (
      <div key={entity.id}>Custom Entity: {entity.label}</div>
    );

    render(
      <ListEntities
        entities={entities}
        headerExtractor={headerExtractor}
        statusExtractor={statusExtractor}
        renderEntity={customRenderEntity}
      />
    );

    const customEntity1 = screen.getByText('Custom Entity: Entity 1');
    const customEntity2 = screen.getByText('Custom Entity: Entity 2');

    expect(customEntity1).toBeInTheDocument();
    expect(customEntity2).toBeInTheDocument();
  });
});
