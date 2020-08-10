import React, { FormEvent, useState } from "react";

import PageHeader from "../../components/PageHeader";
import TeacherItem, {Teacher} from "../../components/TeacherItem";

import "./styles.css";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

function TeacherList() {
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  const [teachers, setTeachers] = useState([]);

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();
    console.log({ subject, week_day, time });
    const response = await api.get("/classes", {
      params: { subject, week_day, time },
    });
    console.log(response);
    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <Select
            label="Matéria"
            name="subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            options={[
              { value: "ReactJS", label: "ReactJS" },
              { value: "VueJS", label: "VueJS" },
              { value: "Banco de dados", label: "Banco de dados" },
              { value: "MySQL", label: "MySQL" },
              { value: "PHP", label: "PHP" },
              { value: "NodeJS", label: "NodeJS" },
              { value: "NestJS", label: "NestJS" },
            ]}
          />
          <Select
            label="Dia da semana"
            name="week_day"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feixa" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            label="Hora"
            name="time"
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <button type="submit" onClick={searchTeachers}>
            Buscar
          </button>
        </form>
      </PageHeader>
      <main>
        {teachers.map((teacher: Teacher, index) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;
