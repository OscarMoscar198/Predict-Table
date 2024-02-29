import { useState } from "react";
import Monaco from "@monaco-editor/react";
import { validacion } from '../components/pila'; // Importa la función validacion aquí

function Home() {
  const [codigo, setCodigo] = useState("");
  const [resul, setResul] = useState([]);
  const [esValido, setEsValido] = useState(null);

  function handleValidarClick() {
    analizarCodigo();
  }

  const analizarCodigo = () => {
    const cadenaS = codigo.replace(/\s/g, "");
    const { esValida, infoPila } = validacion(cadenaS);
    setEsValido(esValida);
    setResul(infoPila);
  };

  function setEditorTheme(monaco) {
    monaco.editor.defineTheme("automatum", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#141417",
        "editor.lineHighlightBackground": "#FFFFFF0F",
      },
    });
  }
  return (
    <>
      <div className="title">
        <h1>AUTOMATUM</h1>
        <h2>Oscar Javier Castañeda Solís - 213447</h2>
      </div>
      <div className="area">
        <Monaco
          beforeMount={setEditorTheme}
          width="800"
          height="50vh"
          language="javascript"
          theme="automatum"
          value={codigo}
          options={{
            selectOnLineNumbers: false,
            mouseStyle: "text",
            acceptSuggestionOnEnter: "off",
            quickSuggestions: false,
          }}
          onChange={(newValue) => {
            console.log("Valor:", newValue);
            setCodigo(newValue);
          }}
        />
        <div className="line-validator">
          <button onClick={handleValidarClick}>VALIDAR</button>
          {esValido !== null && <p>{esValido ? "ES VALIDA" : "NO ES VALIDA"}</p>}
        </div>
      </div>
      <div style={{ marginLeft: "25px" }}>
        <table>
          <tbody>
            {resul.map((info, index) => (
              <tr key={index}>
                <td>{info}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;