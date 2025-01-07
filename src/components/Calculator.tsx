import { useNavigate } from "react-router-dom";
import { useState } from "react";

type OperationType = "+" | "-" | "×" | "÷" | null;

interface CalcButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export default function Calculator() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState<string>("0");
  const [equation, setEquation] = useState<string>("");
  const [previousNumber, setPreviousNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<OperationType>(null);
  const [newNumber, setNewNumber] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const handleNumber = (number: string): void => {
    if (error) setError("");
    if (newNumber || display === "0") {
      setDisplay(number);
      setNewNumber(false);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperation = (op: OperationType): void => {
    if (!op) return;
    if (error) setError("");
    setOperation(op);
    setPreviousNumber(parseFloat(display));
    setNewNumber(true);
    setEquation(`${display} ${op} `);
  };

  const handleEquals = (): void => {
    if (!operation || previousNumber === null) return;

    const current = parseFloat(display);
    let result: number;

    try {
      switch (operation) {
        case "+":
          result = previousNumber + current;
          break;
        case "-":
          result = previousNumber - current;
          break;
        case "×":
          result = previousNumber * current;
          break;
        case "÷":
          if (current === 0) {
            throw new Error("No se puede dividir por cero");
          }
          result = previousNumber / current;
          break;
        default:
          return;
      }

      // Verificar si el resultado es infinito o NaN
      if (!Number.isFinite(result) || Number.isNaN(result)) {
        throw new Error("Resultado inválido");
      }

      // Limitar decimales a 8 para evitar números muy largos
      const formattedResult = parseFloat(result.toFixed(8)).toString();
      setDisplay(formattedResult);
      setEquation(`${previousNumber} ${operation} ${current} = `);
      setOperation(null);
      setPreviousNumber(null);
      setNewNumber(true);
      setError("");

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en el cálculo");
      setDisplay("0");
      setOperation(null);
      setPreviousNumber(null);
      setNewNumber(true);
    }
  };

  const handleClear = (): void => {
    setDisplay("0");
    setEquation("");
    setOperation(null);
    setPreviousNumber(null);
    setNewNumber(true);
    setError("");
  };

  const handleDecimal = (): void => {
    if (error) setError("");
    if (!display.includes(".")) {
      setDisplay(display + ".");
      setNewNumber(false);
    }
  };

  const CalcButton: React.FC<CalcButtonProps> = ({ children, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`p-4 text-xl font-semibold rounded-lg transition-colors duration-150 
      hover:bg-opacity-90 active:bg-opacity-100 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Calculadora</h1>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Volver al Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-md mx-auto mt-8 p-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Display */}
          <div className="bg-gray-800 p-6">
            <div className="text-gray-400 text-right text-sm h-6">
              {equation}
            </div>
            <div className="text-white text-right text-4xl font-light mt-2">
              {error || display}
            </div>
            {error && (
              <div className="text-red-500 text-right text-sm mt-2">
                {error}
              </div>
            )}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-1 p-2 bg-gray-100">
            {/* First row */}
            <CalcButton
              onClick={handleClear}
              className="bg-red-500 text-white"
            >
              C
            </CalcButton>
            <CalcButton
              onClick={() => handleOperation("÷")}
              className="bg-gray-200"
            >
              ÷
            </CalcButton>
            <CalcButton
              onClick={() => handleOperation("×")}
              className="bg-gray-200"
            >
              ×
            </CalcButton>
            <CalcButton
              onClick={() => handleOperation("-")}
              className="bg-gray-200"
            >
              -
            </CalcButton>

            {/* Numbers and operations */}
            <CalcButton
              onClick={() => handleNumber("7")}
              className="bg-white"
            >
              7
            </CalcButton>
            <CalcButton
              onClick={() => handleNumber("8")}
              className="bg-white"
            >
              8
            </CalcButton>
            <CalcButton
              onClick={() => handleNumber("9")}
              className="bg-white"
            >
              9
            </CalcButton>
            <CalcButton
              onClick={() => handleOperation("+")}
              className="bg-gray-200"
            >
              +
            </CalcButton>

            <CalcButton
              onClick={() => handleNumber("4")}
              className="bg-white"
            >
              4
            </CalcButton>
            <CalcButton
              onClick={() => handleNumber("5")}
              className="bg-white"
            >
              5
            </CalcButton>
            <CalcButton
              onClick={() => handleNumber("6")}
              className="bg-white"
            >
              6
            </CalcButton>
            <CalcButton
              onClick={handleEquals}
              className="bg-blue-500 text-white row-span-3"
            >
              =
            </CalcButton>

            <CalcButton
              onClick={() => handleNumber("1")}
              className="bg-white"
            >
              1
            </CalcButton>
            <CalcButton
              onClick={() => handleNumber("2")}
              className="bg-white"
            >
              2
            </CalcButton>
            <CalcButton
              onClick={() => handleNumber("3")}
              className="bg-white"
            >
              3
            </CalcButton>

            <CalcButton
              onClick={() => handleNumber("0")}
              className="bg-white col-span-2"
            >
              0
            </CalcButton>
            <CalcButton
              onClick={handleDecimal}
              className="bg-white"
            >
              .
            </CalcButton>
          </div>
        </div>
      </div>
    </div>
  );
}