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
  EuiFilePicker,
} from '@elastic/eui';

const nameValidator = yup.string().required().max(16).min(2);
const descriptionValidator = yup.string().required().max(1024).min(1);

type Props = {
  onUpload: (name: string, description: string, file: File) => Promise<void>;
  onClose: () => void;
};

const UploadResourceDialog = (props: Props) => {
  const [name, setName, nameError] = useFormField('', nameValidator);
  const [descr, setDescr, descrError] = useFormField('', descriptionValidator);
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleUpload = async () => {
    if (file === null) return;
    setLoading(true);
    await props.onUpload(name, descr, file);
    setLoading(false);
    props.onClose();
  };

  const handleFileChange = (files: FileList | null) => {
    if (files === null) return;
    const file = files[0];
    // Add any validation here
    setFile(file);
  };

  return (
    <EuiOverlayMask className="cz-overlay">
      <EuiModal onClose={props.onClose} initialFocus="[name=name]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Upload new resource</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <EuiForm>
            <EuiFormRow
              label="Name"
              helpText="Keep it short and descriptive"
              isInvalid={!!nameError}
              error={nameError}
            >
              <EuiFieldText
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </EuiFormRow>
            <EuiSpacer />
            <EuiFormRow
              label="Description"
              helpText="A brief description of what the resource is"
              isInvalid={!!descrError}
              error={descrError}
            >
              <EuiTextArea
                name="description"
                value={descr}
                onChange={(e) => setDescr(e.target.value)}
              />
            </EuiFormRow>
            <EuiFormRow label="File" helpText="Try to keep it under 2 MB">
              <EuiFilePicker
                id="asdf2"
                initialPromptText="Select or drag and drop a file"
                onChange={handleFileChange}
                aria-label="Use aria labels when no actual label is in use"
              />
            </EuiFormRow>
          </EuiForm>
        </EuiModalBody>
        <EuiModalFooter>
          <EuiButtonEmpty onClick={props.onClose} isDisabled={loading}>
            Cancel
          </EuiButtonEmpty>
          <EuiButton onClick={handleUpload} fill isLoading={loading}>
            Upload
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );
};

export default UploadResourceDialog;
