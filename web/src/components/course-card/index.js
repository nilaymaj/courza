import * as React from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  Right,
  Button,
  Text,
} from '../../elements';
import { Link } from 'react-router-dom';

const CourseCard = (props) => {
  const course = props.course;
  return (
    <Card>
      <CardHeader>
        <Text size="medium">{course.code} </Text>
        <Text type="note" size="medium">
          {course.name}
        </Text>
      </CardHeader>
      <div className="course-card__body">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus
          dolor in turpis placerat ultricies. Curabitur rutrum eu dui in
          pellentesque. Maecenas egestas neque eu velit bibendum, id scelerisque
          elit faucibus. Suspendisse potenti. Proin dignissim pellentesque
          eleifend. Quisque nulla nunc, cursus quis purus ut, commodo molestie
          sem.{' '}
        </Text>
      </div>
      <CardFooter>
        <Right>
          <Link
            to={{
              pathname: `/home/c/${course._id}`,
              state: course.code,
            }}
          >
            <Button>Enter</Button>
          </Link>
        </Right>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
