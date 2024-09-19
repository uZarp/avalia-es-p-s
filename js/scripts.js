// Função para simular a chegada de uma nova notificação de pesquisa de satisfação
// debugger
function showSurveyNotification() {
  document.getElementById('notification-popup').style.display = 'block';
}

// Função para abrir o formulário de pesquisa
document.getElementById('open-survey').addEventListener('click', function() {
  document.getElementById('notification-popup').style.display = 'none';
  document.getElementById('survey-form').style.display = 'block';
});

// Função para lidar com o envio do formulário
document.getElementById('feedback-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Coleta dos dados do formulário
  const surveyData = {
      cnpj: document.getElementById('cnpj').value,
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      rating: document.querySelector('input[name="rating"]:checked').value,
      feedback: document.getElementById('feedback').value
  };

  // Simulação de armazenamento e envio para outro sistema (ex: pós-venda)
  storeSurveyData(surveyData);
  sendNotificationToPostSales(surveyData);

  // Fecha o formulário de pesquisa
  document.getElementById('survey-form').style.display = 'none';
  alert("Avaliação enviada com sucesso!");
});

// Função que simula o armazenamento de dados
function storeSurveyData(data) {
  console.log("Dados armazenados:", data);
  // Aqui poderia ser feita uma chamada a uma API para armazenar esses dados em um banco de dados real
}

// Função que simula o envio de uma notificação para outro sistema (ex: pós-venda)
function sendNotificationToPostSales(data) {
  console.log(`Notificação: A avaliação do cliente ${data.name} foi recebida.`);
  // Aqui poderia ser feita uma chamada a uma API para notificar outro sistema sobre a avaliação
}

// Simula a geração de uma notificação após 5 segundos
// setTimeout(showSurveyNotification, 5000);

// Simulação de uma nova notificação a cada 60 segundos
// setInterval(showSurveyNotification, 60000);


function formatCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, ""); // Remove tudo que não é dígito
  if (cnpj.length === 14) {
      return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
  return cnpj;
}

// Notificação respondida
function hasUserResponded() {
  return localStorage.getItem('surveyResponded') === 'true';
}

// Função para exibir a notificação
function showNotification() {
  if (!hasUserResponded()) {
      document.getElementById('notification').style.display = 'block';
  }
}

// Função para lidar com a resposta da pesquisa
function handleSurveyResponse() {
  // Marca como respondido no localStorage
  localStorage.setItem('surveyResponded', 'true');
  // Esconde a notificação
  document.getElementById('notification').style.display = 'none';
  // Para o intervalo de exibição da notificação
  clearInterval(notificationIntervalId);
  alert('Obrigado por responder à pesquisa!');
}

// Verifica se o usuário já respondeu ao carregar a página
if (!hasUserResponded()) {
  // Configura o intervalo para mostrar a notificação
  var notificationIntervalId = setInterval(showNotification, notificationInterval);
}

// Exibe a notificação imediatamente ao carregar a página (opcional)
showNotification();


// Função para validar CNPJ
function validateCNPJ(cnpj) {
  const regex = /^\d{14}$/;
  return regex.test(cnpj);
}

// Função para formatar Telefone
function formatPhone(phone) {
  phone = phone.replace(/\D/g, ""); // Remove tudo que não é dígito
  if (phone.length === 11) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return phone;
}

// Função para validar Telefone
function validatePhone(phone) {
  const regex = /^\d{11}$/; // 2 dígitos DDD + 9 dígitos do número
  return regex.test(phone);
}

// Validação do campo CNPJ
document.getElementById('cnpj').addEventListener('input', function(e) {
  this.value = this.value.replace(/\D/g, ''); // Permitir apenas números
});

document.getElementById('cnpj').addEventListener('blur', function(e) {
  const cnpj = this.value;
  if (!validateCNPJ(cnpj)) {
      document.getElementById('cnpj-error').textContent = "CNPJ inválido! Insira 14 dígitos.";
  } else {
      document.getElementById('cnpj-error').textContent = "";
      this.value = formatCNPJ(cnpj); // Formatar CNPJ
  }
});

// Validação do campo Nome
document.getElementById('name').addEventListener('input', function(e) {
  this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); // Permitir apenas letras e espaços
  if (this.value.length > 40) {
      document.getElementById('name-error').textContent = "Nome não pode exceder 40 caracteres.";
  } else {
      document.getElementById('name-error').textContent = "";
  }
});

// Validação do campo Telefone
document.getElementById('phone').addEventListener('input', function(e) {
  this.value = this.value.replace(/\D/g, ''); // Permitir apenas números
});

document.getElementById('phone').addEventListener('blur', function(e) {
  const phone = this.value;
  if (!validatePhone(phone)) {
      document.getElementById('phone-error').textContent = "Telefone inválido! Insira o DDD + 9 dígitos.";
  } else {
      document.getElementById('phone-error').textContent = "";
      this.value = formatPhone(phone); // Formatar Telefone
  }
});

// Validação do campo Email
document.getElementById('email').addEventListener('input', function(e) {
  if (this.value.length > 50) {
      document.getElementById('email-error').textContent = "Email não pode exceder 50 caracteres.";
  } else {
      document.getElementById('email-error').textContent = "";
  }
});

// Validação no envio do formulário
document.getElementById('feedback-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const cnpj = document.getElementById('cnpj').value;
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  let isValid = true;

  if (!validateCNPJ(cnpj)) {
      isValid = false;
      document.getElementById('cnpj-error').textContent = "CNPJ inválido! Insira 14 dígitos.";
  }

  if (name.length > 40) {
      isValid = false;
      document.getElementById('name-error').textContent = "Nome não pode exceder 40 caracteres.";
  }

  if (!validatePhone(phone)) {
      isValid = false;
      document.getElementById('phone-error').textContent = "Telefone inválido! Insira o DDD + 9 dígitos.";
  }

  if (email.length > 50) {
      isValid = false;
      document.getElementById('email-error').textContent = "Email não pode exceder 50 caracteres.";
  }

  if (isValid) {
      alert("Formulário enviado com sucesso!");
      // Aqui você pode adicionar o código para enviar os dados para o backend
  } else {
      alert("Por favor, corrija os erros no formulário antes de enviar.");
  }
});