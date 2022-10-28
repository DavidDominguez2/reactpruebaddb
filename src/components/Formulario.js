import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import Tabla from "./Tabla";

export default class Formulario extends Component {
  selectEspecialidadesRef = React.createRef();
  inputIncrementRef = React.createRef();

  state = {
    especialidades: [],
    statusEspecialidades: false,
    statusSalarios: false,
  };

  loadEspecialidades = () => {
    var request = "/api/doctores/especialidades";
    var url = Global.url + request;

    axios.get(url).then((response) => {
      this.setState({
        especialidades: response.data,
        statusEspecialidades: true,
      });
    });
  };

  updateSalarios = (e) => {
    e.preventDefault();
    var especialidad = this.selectEspecialidadesRef.current.value;
    var incremento = this.inputIncrementRef.current.value;

    var request = "/api/doctores/" + especialidad + "/" + incremento;
    var url = Global.url + request;

    axios.put(url).then((response) => {
      this.setState({ statusSalarios: true });
    });
  };

  componentDidMount = () => {
    this.loadEspecialidades();
  };

  render() {
    return (
      <div>
        <h1>Incremento salarial doctores</h1>
        {this.state.statusEspecialidades && (
          <form onSubmit={this.updateSalarios}>
            <label>Seleccione una especialidad: </label>
            <select ref={this.selectEspecialidadesRef}>
              {this.state.especialidades.map((esp, index) => {
                return (
                  <option value={esp} key={esp + index}>
                    {esp}
                  </option>
                );
              })}
            </select>
            <br />
            <label>Incremento Salarial</label>
            <input type="text" ref={this.inputIncrementRef} />
            <br />
            <button>Incrementar salarios</button>
          </form>
        )}
        {this.state.statusSalarios && (
          <Tabla especialidad={this.selectEspecialidadesRef.current.value} />
        )}
      </div>
    );
  }
}
