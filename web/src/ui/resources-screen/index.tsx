import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  EuiPanel,
  EuiEmptyPrompt,
  EuiFlexGrid,
  EuiFlexItem,
  EuiAccordion,
  EuiButtonIcon,
} from '@elastic/eui';
import { getActiveCourse } from '../../redux/selectors';
import { Resource } from '../../types/index';
import ResourceCard from './resource-card';
import { getAllCourseResources, postNewResource } from '../../utils/requests';
import UploadResourceDialog from '../dialogs/upload-resource-dialog';
import { usePageTitle } from '../hooks';

const ResourcesScreen = () => {
  const course = useSelector(getActiveCourse);
  const [resources, setResources] = React.useState<null | Resource[]>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  usePageTitle(`${course && course.code} Resources | Courza`);

  const fetchResources = React.useCallback(async () => {
    if (!course) throw new Error("Can't fetch resources if no course open.");
    const resources = await getAllCourseResources(course._id);
    setResources(resources);
  }, [course]);

  const onPostNewResource = React.useCallback(
    async (name: string, file: File) => {
      if (!course) throw new Error("Can't post resource if no course open.");
      await postNewResource(course._id, name, file);
      fetchResources();
    },
    [course, fetchResources]
  );

  React.useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return (
    <div className="cz-course__wrapper">
      <div className="cz-course__panel">
        <EuiPanel>
          <EuiEmptyPrompt
            title={<h2>{course && course.code} Resources</h2>}
          ></EuiEmptyPrompt>
          {resources && (
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
                {resources.map((r) => (
                  <EuiFlexItem key={r._id}>
                    <ResourceCard resource={r}></ResourceCard>
                  </EuiFlexItem>
                ))}
              </EuiFlexGrid>
            </EuiAccordion>
          )}
        </EuiPanel>
        {dialogOpen && (
          <UploadResourceDialog
            onUpload={onPostNewResource}
            onClose={() => setDialogOpen(false)}
          ></UploadResourceDialog>
        )}
      </div>
    </div>
  );
};

export default ResourcesScreen;
