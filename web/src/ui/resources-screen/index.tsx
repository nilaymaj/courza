import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  EuiPanel,
  EuiEmptyPrompt,
  EuiAccordion,
  EuiButtonIcon,
  EuiListGroup,
} from '@elastic/eui';
import { getActiveCourse } from '../../redux/selectors';
import { Resource, Course } from '../../types/index';
import ResourceListItem from './resource-list-item';
import { getAllCourseResources, postNewResource } from '../../utils/requests';
import UploadResourceDialog from '../dialogs/upload-resource-dialog';
import { usePageTitle } from '../hooks';

const ResourcesScreen = () => {
  const course = useSelector(getActiveCourse) as Course;
  const [resources, setResources] = React.useState<null | Resource[]>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  usePageTitle(`${course && course.code} Resources | Courza`);

  const fetchResources = React.useCallback(async () => {
    const resources = await getAllCourseResources(course._id);
    setResources(resources);
  }, [course]);

  const onPostNewResource = React.useCallback(
    async (name: string, file: File) => {
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
              <EuiListGroup flush maxWidth={false}>
                {resources.map((r) => (
                  <ResourceListItem resource={r}></ResourceListItem>
                ))}
              </EuiListGroup>
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
