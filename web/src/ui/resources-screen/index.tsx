import * as React from 'react';
import { EuiPanel, EuiEmptyPrompt, EuiLoadingSpinner } from '@elastic/eui';
import { getAllCourseResources, postNewResource } from '../../utils/requests';
import UploadResourceDialog from './upload-resource-dialog';
import { usePageTitle } from '../hooks';
import ResourcesList from './resources-list';
import Topbar from '../topbar';
import { categoriseResources, CategorisedResources } from './utils';
import { useActiveCourse } from '../../providers/route';

const ResourcesScreen = () => {
  const course = useActiveCourse() as ICourse;
  const [resources, setResources] = React.useState<null | CategorisedResources>(
    null
  );
  const [categoryOpen, openCategory] = React.useState<null | string>(null);
  usePageTitle(`${course && course.code} Resources | Courza`);

  const fetchResources = React.useCallback(async () => {
    setResources(null);
    const resources = await getAllCourseResources(course._id);
    const categorisedResources = categoriseResources(resources);
    setResources(categorisedResources);
  }, [course]);

  const onPostNewResource = React.useCallback(
    async (name: string, file: File, category: string) => {
      await postNewResource(course._id, name, file, category);
      fetchResources();
    },
    [course, fetchResources]
  );

  const onCreateCategory = React.useCallback(
    (categoryName: string) => {
      if (!resources) return;
      if (resources[categoryName]) throw new Error('Category exists');
      setResources({ ...resources, [categoryName]: [] });
    },
    [resources]
  );

  React.useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return (
    <>
      <Topbar />
      <div className="cz-course__wrapper">
        <div className="cz-course__panel">
          <EuiPanel>
            <EuiEmptyPrompt
              title={<h2>{course && course.code} Resources</h2>}
            />
            {resources ? (
              <ResourcesList
                categorisedResources={resources}
                onUpload={openCategory}
                onCreateCategory={onCreateCategory}
              />
            ) : (
              <EuiLoadingSpinner />
            )}
          </EuiPanel>
          {categoryOpen && (
            <UploadResourceDialog
              category={categoryOpen}
              onUpload={onPostNewResource}
              onClose={() => openCategory(null)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ResourcesScreen;
