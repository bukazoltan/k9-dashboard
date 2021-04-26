import { Form, Image, Button, Col } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const TawhooEditorForm = ({
  tawhoo,
  updateHandler,
  onSubmit,
  deleteTawhoo,
  deleteMode,
  error,
}) => {
  const deleteWithConfirmation = () => {
    confirmAlert({
      title: "Törlés",
      message: "Biztosan törölni akarod?",
      buttons: [
        {
          label: "Igen",
          onClick: () => deleteTawhoo(),
        },
        {
          label: "Nem",
        },
      ],
    });
  };

  return (
    <Form>
      <Form.Group controlId="wordToGuess">
        <Form.Label>Kitalálandó szó:</Form.Label>
        <Form.Control
          type="text"
          defaultValue={tawhoo.wordToGuess}
          onChange={updateHandler}
          isInvalid={!!error?.wordToGuess}
        />
        <Form.Control.Feedback type="invalid">
          {error ? error.wordToGuess : ""}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="taboos">
        <Form.Label>Taboo szavak (vesszőve elválasztva):</Form.Label>
        <Form.Control
          type="text"
          defaultValue={tawhoo.taboos.join(", ")}
          onChange={updateHandler}
          isInvalid={!!error?.taboos}
        />
        <Form.Control.Feedback type="invalid">
          {error ? error.taboos : ""}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="imgURL">
        <Form.Label>A kép URL-je:</Form.Label>
        <Form.Control
          type="text"
          defaultValue={tawhoo.imgURL}
          onChange={updateHandler}
          isInvalid={!!error?.imgURL}
        />
        <Form.Control.Feedback type="invalid">
          {error ? error.imgURL : ""}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="called">
        <Form.Label>
          Hányszor lett lehívva (minél nagyobb a szám, annál kisebb eséllyel
          jelenik meg újra):
        </Form.Label>
        <Form.Control
          type="number"
          defaultValue={tawhoo.called}
          onChange={(e) => updateHandler(e)}
        />
      </Form.Group>
      <Image src={tawhoo.imgURL} rounded style={{ width: "300px" }} />
      <Form.Group>
        <Col>
          <Button variant="warning" onClick={onSubmit}>
            Tawhoo mentése
          </Button>
        </Col>
        {deleteMode ? (
          <Col>
            <Button variant="danger" onClick={deleteWithConfirmation}>
              Tawhoo törlése
            </Button>
          </Col>
        ) : null}
      </Form.Group>
    </Form>
  );
};

export default TawhooEditorForm;
