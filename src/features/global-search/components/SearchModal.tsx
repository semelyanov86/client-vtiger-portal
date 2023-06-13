import { Modal } from 'react-bootstrap';
import { ArrowBarDown, ArrowLeft } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';

import SearchInput from './SearchInput.tsx';

export interface SearchModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

export const SearchModal = ({ show, setShow }: SearchModalProps) => {
  return (
    <Modal
      id="searchPagesModal"
      className="modal-under-nav modal-search modal-close-out"
      size="lg"
      show={show}
      onHide={() => setShow(false)}
    >
      <Modal.Header className="">
        <h3 className="card-title mb-4">
          <FormattedMessage id="general.global-search"></FormattedMessage>
        </h3>
      </Modal.Header>
      <Modal.Body className="ps-5 pe-5 pb-0 border-0">
        <SearchInput show={show} setShow={setShow} />
      </Modal.Body>
      <Modal.Footer className="border-top justify-content-start ps-5 pe-5 pb-3 pt-3 border-0 mt-3">
        <span className="text-alternate d-inline-block m-0 me-3">
          <ArrowBarDown size={15}></ArrowBarDown>
          <span className="align-middle text-medium">Navigate</span>
        </span>
        <span className="text-alternate d-inline-block m-0 me-3">
          <ArrowLeft size={15}></ArrowLeft>
          <span className="align-middle text-medium">Select</span>
        </span>
      </Modal.Footer>
    </Modal>
  );
};
