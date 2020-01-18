import React from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  Right,
  Button,
  Text
} from '../../elements';
import { Link } from 'react-router-dom';

const CourseCard = props => {
  const course = props.course;
  return (
    <Card>
      <CardHeader>
        <Text heading>{course.code}</Text>
        <Text note large>
          {course.name}
        </Text>
      </CardHeader>
      <div className="course-card__body">{course.body}</div>
      <CardFooter>
        <Right>
          <Link to={`/home/c/${course._id}`}>
            <Button>Enter</Button>
          </Link>
        </Right>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
