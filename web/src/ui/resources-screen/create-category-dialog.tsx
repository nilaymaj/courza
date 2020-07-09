import * as React from 'react';
import * as yup from 'yup';
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
  EuiCallOut,
} from '@elastic/eui';
import { useFormField } from '../hooks';

const nameValidator = yup.string().required().max(16).min(2);

type Props = {
  exists: (name: string) => boolean;
  onCreate: (name: string) => void;
  onClose: () => void;
};

const CreateCategoryDialog = (props: Props) => {
  const [name, setName, nameError] = useFormField('', nameValidator);
  const [exists, setExists] = React.useState(false);

  const createCategory = async () => {
    try {
      await nameValidator.validate(name);
      if (props.exists(name)) return setExists(true);
      props.onCreate(name);
      props.onClose();
    } catch (err) {}
  };

  return (
    <EuiOverlayMask className="cz-overlay">
      <EuiModal onClose={props.onClose} initialFocus="[name=name]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Create new category</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <EuiCallOut
            title="Your new category won't be saved unless you upload a resource."
            size="s"
            color="primary"
            iconType="iInCircle"
          ></EuiCallOut>
          {exists && (
            <EuiCallOut
              title="A category of that name already exists."
              size="s"
              color="danger"
              iconType="alert"
            ></EuiCallOut>
          )}
          <EuiSpacer />
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
          </EuiForm>
        </EuiModalBody>
        <EuiModalFooter>
          <EuiButtonEmpty onClick={props.onClose} isDisabled={false}>
            Cancel
          </EuiButtonEmpty>
          <EuiButton onClick={createCategory} fill isLoading={false}>
            Upload
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );
};

export default CreateCategoryDialog;
