import * as React from 'react';
import { useSelector } from 'react-redux';
import { EuiPanel, EuiEmptyPrompt, EuiLoadingSpinner } from '@elastic/eui';
import { getActiveCourse } from '../../redux/selectors';
import { getAllCourseResources, postNewResource } from '../../utils/requests';
import UploadResourceDialog from './upload-resource-dialog';
import { usePageTitle } from '../hooks';
import ResourcesList from './resources-list';
import { categoriseResources, CategorisedResources } from './utils';

const ResourcesScreen = () => {
  const course = useSelector(getActiveCourse) as ICourse;
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
    <div className="cz-course__wrapper">
      <div className="cz-course__panel">
        <EuiPanel>
          <EuiEmptyPrompt title={<h2>{course && course.code} Resources</h2>} />
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
  );
};

export default ResourcesScreen;
