import * as React from 'react';
import {
  EuiAccordion,
  EuiButtonIcon,
  EuiListGroup,
  EuiButtonEmpty,
} from '@elastic/eui';
import ResourceListItem from './resource-list-item';
import { Resource } from '../../types';
import { CategorisedResources } from './utils';
import CreateCategoryDialog from './create-category-dialog';

type CategoryProps = {
  category: string;
  resources: Resource[];
  onUpload: () => void;
};

const ResourceCategory = (props: CategoryProps) => {
  return (
    <EuiAccordion
      initialIsOpen
      id="cz-resources__dd"
      buttonContent={props.category}
      paddingSize="m"
      extraAction={
        <EuiButtonIcon
          title="Upload new resource"
          iconType="plusInCircle"
          aria-label="upload new resource"
          onClick={props.onUpload}
        ></EuiButtonIcon>
      }
    >
      <EuiListGroup flush maxWidth={false}>
        {props.resources.map((r) => (
          <ResourceListItem resource={r} key={r._id}></ResourceListItem>
        ))}
      </EuiListGroup>
    </EuiAccordion>
  );
};

type Props = {
  categorisedResources: CategorisedResources;
  onUpload: (categoryName: string) => void;
  onCreateCategory: (categoryName: string) => void;
};

const ResourcesList = (props: Props) => {
  const [newCategoryOpen, openNewCategory] = React.useState(false);
  return (
    <>
      {Object.keys(props.categorisedResources).map((categoryName) => (
        <ResourceCategory
          key={categoryName}
          category={categoryName}
          resources={props.categorisedResources[categoryName]}
          onUpload={() => props.onUpload(categoryName)}
        ></ResourceCategory>
      ))}
      {newCategoryOpen && (
        <CreateCategoryDialog
          onCreate={props.onCreateCategory}
          onClose={() => openNewCategory(false)}
          exists={(name) => !!props.categorisedResources[name]}
        ></CreateCategoryDialog>
      )}
      <EuiButtonEmpty onClick={() => openNewCategory(true)}>
        + Create a new category
      </EuiButtonEmpty>
    </>
  );
};

export default ResourcesList;
