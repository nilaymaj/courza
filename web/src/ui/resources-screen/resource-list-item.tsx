import * as React from 'react';
import { EuiIcon, EuiText, EuiListGroupItem, EuiTextColor } from '@elastic/eui';
import { Resource } from '../../types';
import pdfIcon from '../../assets/pdf-icon.svg';

type Props = {
  resource: Resource;
};

const ResourceCard = (props: Props) => {
  const resource = props.resource;
  return (
    <EuiListGroupItem
      label={
        <EuiText>
          {resource.name}
          <br></br>
          <EuiText size="xs">
            <EuiTextColor color="subdued">
              Uploaded by {resource.student.name}
            </EuiTextColor>
          </EuiText>
        </EuiText>
      }
      onClick={() => window.open(resource.url, '_blank')}
      icon={<EuiIcon size="xl" type={pdfIcon} />}
    ></EuiListGroupItem>
  );
};

export default ResourceCard;
