interface IProps {
  handleSubmit: (password: string) => void;
}

export const RecoveryPwdForm = ({ handleSubmit }: IProps) => {
  return (
    <div>
      <span>Formulario para solicitar el cambio de contraseña</span>
      <button
        className="btn btn-primary"
        onClick={() => handleSubmit("password")}
      >
        Enviar
      </button>
    </div>
  );
};
