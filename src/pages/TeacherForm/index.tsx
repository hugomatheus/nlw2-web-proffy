import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import "./styles.css";
import api from "../../services/api";

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (position === index) {
        // utiliza os [] na variavel field para alterar a chave do objeto com o nome que vem em field tirando as [] seria criado uma nova chave no objeto com o nome field
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    console.log({ name, avatar, whatsapp, bio, subject, cost, scheduleItems });
    api
      .post("/classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert("Cadastro realizado com sucesso");
        history.push("/");
      })
      .catch(() => alert("Erro ao realizado o cadastro"));
  }

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              label="Nome completo"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              label="Avatar"
              name="avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            <Input
              label="WhatsApp"
              name="whatsapp"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
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
            <Input
              label="Custo da sua hora por aula"
              name="cost"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={index} className="schedule-item">
                  <Select
                    label="Dia da semana"
                    name="week_day"
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
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
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(e) => {
                      setScheduleItemValue(index, "from", e.target.value);
                    }}
                  ></Input>
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(e) => {
                      setScheduleItemValue(index, "to", e.target.value);
                    }}
                  ></Input>
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
