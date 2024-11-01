import React, { useState } from "react";
import "./ratingmodal.css";
import { Rating, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {
  sendSatisfactionSurvey,
} from "../../../controller/UserController";

// Traducción de etiquetas para el feedback en español
const labels: { [index: string]: string } = {
  0.5: "Muy malo",
  1: "Malo",
  1.5: "Regular",
  2: "Regular+",
  2.5: "Aceptable",
  3: "Bueno",
  3.5: "Bueno+",
  4: "Muy bueno",
  4.5: "Excelente",
  5: "Excelente+",
};

function getLabelText(value: number) {
  return `${value} Estrella${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

interface RatingModalProps {
  setShow: (show: boolean) => void; // Prop para controlar el cierre del modal completo
  jobId: string;
  description: string;
  dpitrabajador: string;
}

const RatingModal: React.FC<RatingModalProps> = ({
  setShow,
  jobId,
  description,
  dpitrabajador,
}) => {
  const [value, setValue] = useState<number | null>(null); // Iniciar con 0 estrellas
  const [hover, setHover] = useState(-1);

  const handleConfirm = async () => {
    try {

      sendSatisfactionSurvey(Number(jobId), Number(value), dpitrabajador, description);
      setShow(false); // Close the modal after successful submission
    } catch (err) {
      console.error("Error sending satisfaction survey:", err);
      alert("Failed to send satisfaction survey.");
    }
  };
  return (
    <div className="rating-modal">
      {/* Fila 1: Título */}
      <div className="title-row">
        <h2>¿Qué te pareció su servicio?</h2>
      </div>

      {/* Fila 2: Descripción */}
      <div className="description-row">
        <span>Al calificarlo ayudas a toda la comunidad.</span>
      </div>

      {/* Fila 3: Rating con feedback */}
      <div className="rating-row">
        <Box sx={{ width: 250, display: "flex", alignItems: "center" }}>
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            // Aumenta el tamaño de las estrellas
            sx={{
              fontSize: "60px", // Tamaño más grande
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
      </div>

      {/* Fila 4: Botón de confirmación */}
      <div className="buttons-row">
        <button className="confirm-button" onClick={handleConfirm}>
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
