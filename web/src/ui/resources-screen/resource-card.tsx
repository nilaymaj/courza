import * as React from 'react';
import { EuiCard, EuiIcon } from '@elastic/eui';
import { Resource } from '../../types';
import pdfIcon from '../../assets/pdf-icon.svg';

type Props = {
  resource: Resource;
};

const ResourceCard = (props: Props) => {
  const resource = props.resource;
  return (
    <EuiCard
      layout="horizontal"
      icon={<EuiIcon size="xxl" type={pdfIcon} />}
      title={resource.name}
      description={`Uploaded by ${resource.student.name}`}
      onClick={() => window.open(resource.url, '_blank')}
    />
  );
};

export default ResourceCard;
