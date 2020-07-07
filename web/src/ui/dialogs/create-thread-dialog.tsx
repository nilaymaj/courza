import { EuiTextArea } from '@elastic/eui';
import React from 'react';
import * as yup from 'yup';
import { useFormField } from '../hooks';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSpacer,
} from '@elastic/eui';

const titleValidator = yup.string().required().max(64).min(2);
const descriptionValidator = yup.string().required().max(1024).min(1);

type Props = {
  onCreate: (title: string, description: string) => Promise<void>;
  onClose: () => void;
};

const CreateThreadDialog = (props: Props) => {
  const [title, setTitle, titleError] = useFormField('', titleValidator);
  const [descr, setDescr, descrError] = useFormField('', descriptionValidator);
  const [loading, setLoading] = React.useState(false);

  const handleCreate = async () => {
    setLoading(true);
    await props.onCreate(title, descr);
    setLoading(false);
    props.onClose();
  };

  return (
    <EuiOverlayMask className="cz-overlay">
      <EuiModal onClose={props.onClose} initialFocus="[name=title]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Create new thread</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <EuiForm>
            <EuiFormRow
              label="Title"
              helpText="Keep it short and descriptive"
              isInvalid={!!titleError}
              error={titleError}
            >
              <EuiFieldText
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </EuiFormRow>
            <EuiSpacer />
            <EuiFormRow
              label="Description"
              helpText="This will be posted as the first comment on the thread"
              isInvalid={!!descrError}
              error={descrError}
            >
              <EuiTextArea
                name="description"
                value={descr}
                onChange={(e) => setDescr(e.target.value)}
              />
            </EuiFormRow>
          </EuiForm>
        </EuiModalBody>
        <EuiModalFooter>
          <EuiButtonEmpty onClick={props.onClose} isDisabled={loading}>
            Cancel
          </EuiButtonEmpty>
          <EuiButton onClick={handleCreate} fill isLoading={loading}>
            Create
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );
};

export default CreateThreadDialog;
