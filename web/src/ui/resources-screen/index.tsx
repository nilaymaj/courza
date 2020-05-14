import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  EuiPanel,
  EuiEmptyPrompt,
  EuiFlexGrid,
  EuiFlexItem,
  EuiAccordion,
  EuiButton,
  EuiButtonIcon,
} from '@elastic/eui';
import { getActiveCourse } from '../../redux/selectors';
import sampleResources from '../../samples/resources.json';
import ResourceCard from './resource-card';
import UploadResourceDialog from '../dialogs/upload-resource.dialog';

const ResourcesScreen = () => {
  const course = useSelector(getActiveCourse);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return (
    <div className="cz-course__wrapper">
      <div className="cz-course__panel">
        <EuiPanel>
          <EuiEmptyPrompt
            title={<h2>{course && course.code} Resources</h2>}
          ></EuiEmptyPrompt>
          <EuiAccordion
            initialIsOpen
            id="cz-resources__dd"
            buttonContent="General resources"
            extraAction={
              <EuiButtonIcon
                title="Upload new resource"
                iconType="plusInCircle"
                aria-label="upload new resource"
                onClick={() => setDialogOpen(true)}
              ></EuiButtonIcon>
            }
            paddingSize="l"
          >
            <EuiFlexGrid gutterSize="s" columns={3}>
              {sampleResources.map((r) => (
                <EuiFlexItem key={r._id}>
                  <ResourceCard resource={r}></ResourceCard>
                </EuiFlexItem>
              ))}
            </EuiFlexGrid>
          </EuiAccordion>
        </EuiPanel>
        {dialogOpen && (
          <UploadResourceDialog
            onUpload={(a, b, c) => new Promise(() => console.log(a, b, c))}
            onClose={() => setDialogOpen(false)}
          ></UploadResourceDialog>
        )}
      </div>
    </div>
  );
};

export default ResourcesScreen;
