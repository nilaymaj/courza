import * as React from 'react';
import {
  EuiButton,
  EuiComboBox,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import { getAllCourses } from '../../utils/requests';

type ICourseOption = {
  label: string;
  value: string;
};

type Props = {
  onJoin: (courseId: string) => void;
};

const CourseSearch = (props: Props) => {
  const [courseOptions, setCourseOptions] = React.useState<ICourseOption[]>([]);
  const [
    selectedOption,
    setSelectedOption,
  ] = React.useState<ICourseOption | null>(null);

  // Fetch list of all courses
  React.useEffect(() => {
    (async () => {
      const coursesList = await getAllCourses();
      const courseOptions = coursesList.map((course: ICourse) => ({
        label: course.code,
        value: course._id,
      }));
      setCourseOptions(courseOptions);
    })();
  }, []);

  const handleOptionChange = (selection: ICourseOption[]) => {
    if (selection.length) setSelectedOption(selection[0]);
    else setSelectedOption(null);
  };

  const handleJoinCourse = () => {
    if (!selectedOption) return;
    props.onJoin(selectedOption.value);
  };

  return (
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiComboBox
          placeholder="Join a course..."
          singleSelection={{ asPlainText: true }}
          options={courseOptions}
          isLoading={!courseOptions.length}
          selectedOptions={selectedOption ? [selectedOption] : []}
          // @ts-ignore
          onChange={handleOptionChange}
          fullWidth
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton disabled={!selectedOption} onClick={handleJoinCourse}>
          Join
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default CourseSearch;
