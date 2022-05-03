import React, { useState, useEffect } from "react"; // São funções que permite você ligar os recursos de estado e ciclo de vida
import { Card } from "../../Components/Card";
import "./style.css";

// criação de variaveis
export function Home() {
  
  const [studentName, setStudentname] = useState("");
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '',avatar: ''})

  function handleAddStudent() {

    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
  }
  // user Effect para definir dados sobre usuario, avatar.etc

  useEffect (() =>{
    async function fetchData(){
      const response = await fetch('https://api.github.com/users/werlleson')
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }
    fetchData();
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div >
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto de perfil" />
        </div>
      </header>

      
      {/* caixa de texto para digitar o nome dos estudantes da lista */}
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentname(e.target.value)} 
       
      />
      {/* botão */}
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {/* modo como as informações dos estudantes vão aparecer */}
      {
      students.map((student) => (
          <Card
          key={student.time}        //adicionado uma chave para que o "studante" seja unico
            name={student.name} 
            time={student.time}
          />
      ))
      
      }
    </div>
  );
}
