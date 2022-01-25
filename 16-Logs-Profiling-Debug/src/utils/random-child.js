const randomNumbers = (cant) => {
  let distribucion = {};
  for (let i = 0; i < cant; i++) {
    let numeroAleatorio = Math.floor(Math.random() * 1000 + 1);
    if (distribucion[numeroAleatorio]) {
      distribucion[numeroAleatorio] += 1;
    } else {
      distribucion[numeroAleatorio] = 1;
    }
  }
  return distribucion;
};

process.on("message", (msg) => {
  console.log(
    `worker #${process.pid} iniciando su tarea con ${msg} iteraciones`
  );
  const result = randomNumbers(msg);
  process.send(result);
  console.log(
    `worker #${process.pid} finalizando su tarea con ${msg} iteraciones`
  );
  process.exit();
});

process.send({ isReady: true });
