function Buscador({ valor, onChange }) {
  return (
    <input
      type="text"
      className="buscador"
      placeholder="Buscar película por título..."
      value={valor}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default Buscador;
