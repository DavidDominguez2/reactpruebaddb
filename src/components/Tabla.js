import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";

export default class Tabla extends Component {
  state = {
    doctores: [],
    status: false,
  };

  loadDoctores = () => {
    var request =
      "/api/Doctores/DoctoresEspecialidad/" + this.props.especialidad;
    var url = Global.url + request;

    axios.get(url).then((res) => {
      this.setState({ doctores: res.data, status: true });
    });
  };

  componentDidMount = () => {
    this.loadDoctores();
  };

  componentDidUpdate = (oldProps) => {
    if (oldProps.especialidad !== this.props.especialidad) {
      this.loadDoctores();
    }
  };
  render() {
    return (
      <div>
        <h1>Table Doctores {this.props.especialidad}</h1>
        <table border="1">
          <thead>
            <tr>
              <th>Apellido</th>
              <th>Especialidad</th>
              <th>Salario</th>
            </tr>
          </thead>
          <tbody>
            {this.state.doctores.map((doctor, index) => {
              return (
                <tr key={doctor.idDoctor}>
                  <td>{doctor.apellido}</td>
                  <td>{doctor.especialidad}</td>
                  <td>{doctor.salario}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
