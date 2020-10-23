import * as React from 'react';
import { EuiCallOut } from '@elastic/eui';
import * as yup from 'yup';
import { useFormField } from '../hooks';
import { validateFile } from '../../utils/base';

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

const nameValidator = yup.string().required().max(32).min(2);

type Props = {
  category: string;
  onUpload: (name: string, file: File, category: string) => Promise<void>;
  onClose: () => void;
};

const UploadResourceDialog = (props: Props) => {
  const [formError, setFormError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [name, setName, nameError] = useFormField('', nameValidator);
  const [fileError, setFileError] = React.useState<string | null>(null);

  const handleUpload = async () => {
    if (file === null) return;
    setLoading(true);
    try {
      await props.onUpload(name, file, props.category);
      props.onClose();
    } catch (err) {
      const status = err.response.status;
      if (status === 400)
        setFormError("Invalid data. Check the information you've provided.");
      else setFormError('An unknown error occured. Try again later.');
    }
    setLoading(false);
  };

  const handleFileChange = (files: FileList | null) => {
    if (files === null || files.length === 0) return;
    const file = files[0];
    // Add any validation here
    const err = validateFile(file, {
      mimetypes: ['application/pdf'],
      maxSize: 9000,
    });
    if (!err) return setFile(file);
    setFileError(err);
  };

  return (
    <EuiOverlayMask className="cz-overlay">
      <EuiModal onClose={props.onClose} initialFocus="[name=name]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Upload new resource</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <EuiForm>
            {!!formError && (
              <>
                <EuiCallOut
                  title={formError}
                  size="s"
                  color="danger"
                  iconType="alert"
                ></EuiCallOut>
                <EuiSpacer></EuiSpacer>
              </>
            )}
            <EuiFormRow
              label="Name"
              helpText="Keep it short and descriptive"
              isInvalid={!!nameError || !name}
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
              label="File"
              helpText="Try to keep it under 2 MB"
              isInvalid={!!fileError}
              error={fileError}
            >
              <EuiFilePicker
                isInvalid={!!fileError}
                onChange={handleFileChange}
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
