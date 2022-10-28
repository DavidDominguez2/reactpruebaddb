import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import Tabla from "./Tabla";

export default class Formulario extends Component {
  //REFERENCIAR INPUTS Y SELECT
  selectEspecialidadesRef = React.createRef();
  inputIncrementRef = React.createRef();

  state = {
    especialidades: [],
    statusEspecialidades: false,
    statusSalarios: false,
    change: false,
  };

  //GET ESPECIALIDADES
  loadEspecialidades = () => {
    var request = "/api/doctores/especialidades";
    var url = Global.url + request;

    axios.get(url).then((response) => {
      //CARGAR EN EL STATE ESPECIALIDADES
      this.setState({
        especialidades: response.data,
        statusEspecialidades: true,
      });
    });
  };

  //UPDATE SALARIOS
  updateSalarios = (e) => {
    e.preventDefault();
    //RECOGER VALUES
    var especialidad = this.selectEspecialidadesRef.current.value;
    var incremento = this.inputIncrementRef.current.value;

    var request = "/api/doctores/" + especialidad + "/" + incremento;
    var url = Global.url + request;

    axios.put(url).then((response) => {
      this.setState({
        statusSalarios: true,
        change: false,
      });
    });
  };

  componentDidMount = () => {
    this.loadEspecialidades();
  };
  changeValue = (e) => {
    e.preventDefault();
    this.setState({ change: true });
  };

  render() {
    return (
      <div>
        <h1>Incremento salarial doctores</h1>
        {this.state.statusEspecialidades && (
          <form onSubmit={this.updateSalarios}>
            <label>Seleccione una especialidad: </label>
            <select
              ref={this.selectEspecialidadesRef}
              onChange={this.changeValue}
            >
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
          <Tabla
            especialidad={this.selectEspecialidadesRef.current.value}
            change={this.state.change}
          />
        )}
      </div>
    );
  }
}
