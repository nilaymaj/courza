import React from 'react';
import { Card, CardFooter, CardHeader, Right, Button, Text } from '../../elements';

const CourseCard = props => {
  const course = props.course;
  return (
    <Card>
      <CardHeader>
        {/* <span className="course-card__code">{course.code}</span> */}
        <Text heading>{course.code}</Text>
        {/* <span className="course-card__name">{course.name}</span> */}
        <Text note large>
          {course.name}
        </Text>
      </CardHeader>
      <div className="course-card__body">{course.body}</div>
      <CardFooter>
        <Right>
          <Button>Enter</Button>
        </Right>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
